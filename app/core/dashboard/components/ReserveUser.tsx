"use client"

import Link from "next/link"
import { CalendarReserve } from "./CalendarReserve"
import { ModalitiesReserve } from "./ModalitiesReserve"
import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Reservation, SessionModalityToUser } from "@/schemas/reservations"
import { useProfessionalSettingsStore } from "@/store/ProfessionalSettingsStore"
import { useAuthStore } from "@/store/AuthStore"
import { getEndTimeReservation } from "../utils/getEndTimeReservation"
import { useReservationsStore } from "@/store/ReservationsStore"
import { useRouter } from "next/navigation"
import { getAvailabilityesReservations } from "../utils/getAvailabilitysReservations"
import { AdminBlock, getAdminBlocks } from "../utils/getAdminBlocks"

export const ReserveUser = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const [slots, setSlots] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [localReservation, setLocalReservation] = useState<Reservation>({
    id: "",
    client_id: "",
    professional_id: "",
    start_time: "",
    end_time: "",
    status: "PENDING",
    session_modality: "",
    created_at: "",
  })
  const [adminBlocks, setAdminBlocks] = useState<AdminBlock[]>();
  const router = useRouter()
  const setCurrentReservation = useReservationsStore(
    (state) => state.setCurrentReservation
  )
  const getProfessionalSettings = useProfessionalSettingsStore(
    (state) => state.getProfessionalSettings
  )
  const currentProfessionalSettings = useProfessionalSettingsStore(
    (state) => state.professional_settings
  )

  const currentSession = useAuthStore((state) => state.session)

  const effectiveSessionModality =
    currentProfessionalSettings?.session_modalities === "BOTH"
      ? localReservation.session_modality
      : currentProfessionalSettings?.session_modalities ?? ""

  useEffect(() => {
    getProfessionalSettings()
  }, [])

  const handleDate = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime("")
    setSlots([])

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      if (!date) return

      const response = await getAvailabilityesReservations({
        date,
        professional_id: currentProfessionalSettings?.user_id || "",
      })

      setSlots(response.occupiedSlots)
    }, 300)
  }

  const handleTime = (realTime: string) => {
    setSelectedTime(realTime)
  }

  const handleSessionModalitie = ({
    modalitie,
  }: {
    modalitie: SessionModalityToUser
  }) => {
    setLocalReservation({
      ...localReservation,
      session_modality: modalitie,
    })
  }

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return

    const endTime = getEndTimeReservation({
      start_time: selectedTime,
      session_duration_minutes:
        currentProfessionalSettings?.session_duration_minutes || 45,
    })

    const updatedReservation: Reservation = {
      ...localReservation,
      start_time: selectedTime,
      end_time: endTime,
      client_id: currentSession?.user.id || "",
      professional_id: currentProfessionalSettings?.user_id || "",
      session_modality: effectiveSessionModality,
    }

    setLocalReservation(updatedReservation)

    const result = setCurrentReservation(updatedReservation)

    if (!result.error) {
      if (currentProfessionalSettings?.requires_deposit) router.push("/dashboard/reserve/payment")
      else router.push("/dashboard/reserve/confirm")
    }
  }

  const canContinue = Boolean(
    selectedDate &&
    selectedTime &&
    effectiveSessionModality.length
  )

  useEffect(() => {

    const fetchAdminBlocks = async () => {
      if (currentProfessionalSettings?.user_id) {
        const data = await getAdminBlocks({ professionalId: currentProfessionalSettings?.user_id || "" });
        if(data.length) setAdminBlocks(data);
      }
    };

    fetchAdminBlocks();

  }, [currentProfessionalSettings]);

  return (
    <>
      <section className="w-full max-h-screen flex justify-between  gap-x-10">
        <article className="w-1/2">

          <CalendarReserve
            handleDate={handleDate}
            handleTime={handleTime}
            date={selectedDate}
            currentProfessionalSettings={currentProfessionalSettings}
            occupiedSlots={slots}
            adminBlocks={adminBlocks}
          />
        </article>

        <article className="w-1/2 h-full flex flex-col justify-between">
          <ModalitiesReserve
            currentProfessionalSettings={currentProfessionalSettings}
            canContinue={canContinue}
            handleModalitie={handleSessionModalitie}
            currentModalitie={localReservation.session_modality}
            handleContinue={handleContinue}
          />
        </article>
      </section>
    </>
  )
}
