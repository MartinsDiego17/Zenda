"use client";
import { useReservationsStore } from "@/store/ReservationsStore";
import { CircleCheck, Calendar, Clock, Map, User, MapPin, ArrowLeft, Info } from "lucide-react";
import { getFormattedDataCurrentReservation } from "../utils/getFormattedDataCurrentReservation";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect, useState, useRef } from "react";
import { useProfessionalSettingsStore } from "@/store/ProfessionalSettingsStore";
import { Profile } from "@/schemas/profile";
import { useRedirectUserConfirmationPayment } from "@/lib/redirectUserConfirmationPayment";
import Link from "next/link";
import { ButtonPrimary } from "../../web-components/ButtonPrimary";
import { createReservation } from "../utils/createReservation";


export const ReserveConfirm = () => {

    const currentReservation = useReservationsStore(state => state.currentReservation);
    const currentFindOneUser = useAuthStore(state => state.findOneUser);
    const currentProfessionalSettings = useProfessionalSettingsStore(state => state.professional_settings);

    const localFormattedReservationData = getFormattedDataCurrentReservation(currentReservation);
    const [localCurrentUserAdmin, setLocalCurrentUserAdmin] = useState<Profile | null>();

    useRedirectUserConfirmationPayment({ reservation: currentReservation });

    useEffect(() => {
        if (currentProfessionalSettings) {
            const fetchUserAdmin = async () => {
                const data = await currentFindOneUser({ userId: currentProfessionalSettings.user_id });
                setLocalCurrentUserAdmin(data);
            }
            fetchUserAdmin();

        }
    }, [currentProfessionalSettings, currentFindOneUser, currentReservation]);

    const hasCreatedReservation = useRef(false);

    useEffect(() => {
        if (!currentReservation) return;

        if (hasCreatedReservation.current) return;

        hasCreatedReservation.current = true;

        const { client_id, professional_id, start_time, end_time, status, session_modality } = currentReservation;

        const newReservation = {
            client_id,
            professional_id,
            start_time,
            end_time,
            status,
            session_modality
        };

        const fetchCreate = async () => {
            try {
                await createReservation({ newReservation });
            } catch (error) {
                console.error("Error creating reservation", error);
            }
        };

        fetchCreate();

    }, [currentReservation]);


    return (
        <div className="flex justify-center place-items-center w-full h-full pb-20">
            <section>

                <article className="flex flex-col justify-center place-items-center gap-y-2">

                    <div className="p-4 rounded-full border-5 border-(--color-terciary-transparent) bg-(--color-secondary-transparent)">
                        <span className="text-(--color-primary)">
                            <CircleCheck strokeWidth={2} size={45} />
                        </span>
                    </div>

                    <h2 className="text-center font-extrabold mt-4 text-(--color-primary-text) text-3xl w-full mb-5">
                        Turno confirmado
                    </h2>
                    <p className="mb-10 text-center text-[.9rem] opacity-70">Tu reserva ha sido confirmada correctamente. A continuación te dejamos los detalles</p>
                </article>

                <article className="mt-10 flex justify-center place-items-center gap-x-8">

                    <div className="card-confirm-reserve-container p-6">
                        <ul className="flex flex-col gap-y-4">
                            <li>
                                <span className="text-(--color-primary-hover)"><Calendar size={15} strokeWidth={2} /></span>
                                <span>{localFormattedReservationData?.formattedDate}</span>
                            </li>
                            <li>
                                <span className="text-(--color-primary-hover)"><Clock size={15} strokeWidth={2} /></span>
                                <span>{localFormattedReservationData?.formattedSchedule}</span>
                            </li>
                            <li>
                                <span className="text-(--color-primary-hover)"><Map size={15} strokeWidth={2} /></span>
                                <span>{localFormattedReservationData?.formattedSessionModality}</span>
                            </li>
                            <li>
                                <span className="text-(--color-primary-hover)"><User size={15} strokeWidth={2} /></span>
                                <span>Licenciada/o {localCurrentUserAdmin?.full_name}</span>
                            </li>
                            {
                                localFormattedReservationData?.formattedSessionModality === "Presencial" && <li>
                                    <span className="text-(--color-primary-hover)"><MapPin size={15} strokeWidth={2} /></span>
                                    <span>{currentProfessionalSettings?.office_address || ""}</span>
                                </li>
                            }
                        </ul>
                    </div>

                    <div className="card-confirm-reserve-container p-6">
                        <h3 className="font-bold flex place-items-center gap-x-2">
                            <span><Info className="size-4 text-(--color-primary)" /></span>
                            <span>Reserva confirmada</span>
                        </h3>
                        <p className="opacity-60 text-[.9rem] mt-2">Tu turno ha sido confirmado con éxito. Las solicitudes de cancelación o reprogramación deberán realizarse con una antelación mínima de 48 horas.</p>
                    </div>

                </article>

                <article className="mt-6">
                    <Link href={"/dashboard"}>
                        <ButtonPrimary>
                            <span><ArrowLeft /></span>
                            <span>Volver al inicio</span>
                        </ButtonPrimary>
                    </Link>
                </article>


            </section>
        </div>
    );
};
