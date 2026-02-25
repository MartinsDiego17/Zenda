"use client"

import * as React from "react"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Clock2Icon } from "lucide-react"

interface ProfessionalSettings {
  work_days: string
  work_start_time: string
  work_end_time: string
  session_duration_minutes: number
  reservation_window_days: number
}

interface AdminBlock {
  start: string
  end: string
}


interface Props {
  handleDate: (date: Date | undefined) => void
  handleTime: (time: string) => void
  date: Date | undefined
  currentProfessionalSettings: ProfessionalSettings | null
  occupiedSlots: string[]
  adminBlocks?: AdminBlock[] // <-- NEW
}

interface TimeSlot {
  time: string
  realTime: string
}

const dayMap: Record<string, number> = {
  SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6,
}

export const CalendarReserve = ({
  handleDate,
  handleTime,
  date,
  currentProfessionalSettings,
  occupiedSlots,
  adminBlocks = [],
}: Props) => {
  const enabledDays = React.useMemo(() => {
    if (!currentProfessionalSettings?.work_days) return []
    const [start, end] = currentProfessionalSettings.work_days.split("-")
    const startIndex = dayMap[start]
    const endIndex = dayMap[end]
    const days: number[] = []
    for (let i = startIndex; i <= endIndex; i++) days.push(i)
    return days
  }, [currentProfessionalSettings])

  const isDateDisabled = (day: Date) => {
    if (!currentProfessionalSettings) return true
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + currentProfessionalSettings.reservation_window_days)
    if (day <= today) return true
    if (day > maxDate) return true
    return false
  }

  const generateTimeSlots = (
    date: Date,
    start: string,
    end: string,
    duration: number
  ): TimeSlot[] => {
    const slots: TimeSlot[] = []
    const REST_MINUTES = 10
    const interval = duration + REST_MINUTES
    const [startHour, startMinute] = start.split(":").map(Number)
    const [endHour, endMinute] = end.split(":").map(Number)

    const current = new Date(date)
    current.setHours(startHour, startMinute, 0, 0)

    const endDate = new Date(date)
    endDate.setHours(endHour, endMinute, 0, 0)

    while (current < endDate) {
      const hours = current.getHours().toString().padStart(2, "0")
      const minutes = current.getMinutes().toString().padStart(2, "0")
      const time = `${hours}:${minutes}`
      const yyyy = current.getFullYear()
      const mm = String(current.getMonth() + 1).padStart(2, "0")
      const dd = String(current.getDate()).padStart(2, "0")
      const realTime = `${yyyy}-${mm}-${dd} ${time}:00`
      slots.push({ time, realTime })
      current.setMinutes(current.getMinutes() + interval)
    }

    return slots
  }

  const timeSlots = React.useMemo<TimeSlot[]>(() => {
    if (!currentProfessionalSettings || !date) return []
    return generateTimeSlots(
      date,
      currentProfessionalSettings.work_start_time,
      currentProfessionalSettings.work_end_time,
      currentProfessionalSettings.session_duration_minutes
    )
  }, [currentProfessionalSettings, date])

  /**
   * Checks whether a user time slot conflicts with anything:
   * 1. Exact match in occupiedSlots (existing bookings)
   * 2. Overlap with any admin block range
   *
   * Overlap condition (half-open intervals):
   *   slotStart < blockEnd  AND  slotEnd > blockStart
   */
  const isConflicting = React.useCallback(
    (realTime: string): boolean => {
      const sessionDuration = currentProfessionalSettings?.session_duration_minutes ?? 45

      // Normalize to ISO format for consistent Date parsing
      const normalized = realTime.replace(" ", "T")

      // 1. Check exact occupied slots (existing user bookings)
      if (occupiedSlots.includes(normalized)) return true

      // 2. Check overlap with admin blocks
      const slotStart = new Date(normalized).getTime()
      const slotEnd = slotStart + sessionDuration * 60 * 1000

      for (const block of adminBlocks) {
        const blockStart = new Date(block.start.replace(" ", "T")).getTime()
        const blockEnd = new Date(block.end.replace(" ", "T")).getTime()

        // Classic interval overlap: slotStart < blockEnd AND slotEnd > blockStart
        if (slotStart < blockEnd && slotEnd > blockStart) {
          return true
        }
      }

      return false
    },
    [occupiedSlots, adminBlocks, currentProfessionalSettings]
  )

  return (
    <Card className="calendar-reserve-container mx-auto w-fit">
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDate}
          locale={es}
          disabled={isDateDisabled}
          id="user-calendar"
          className="p-0 w-full"
        />
      </CardContent>

      <CardFooter className="border-t">
        {date && timeSlots.length > 0 && (
          <FieldGroup>
            <Field>
              <FieldLabel>Hora de comienzo</FieldLabel>
              <InputGroup className="border-(--color-border)">
                <Select onValueChange={handleTime}>
                  <SelectTrigger
                    id="time-from"
                    className="border-none shadow-none cursor-pointer w-full"
                  >
                    <SelectValue placeholder="Seleccionar horario" />
                  </SelectTrigger>

                  <SelectContent className="time-select-content">
                    {timeSlots.map(({ time, realTime }) => {
                      const disabled = isConflicting(realTime)

                      return (
                        <SelectItem
                          key={realTime}
                          value={realTime}
                          disabled={disabled}
                          className={
                            disabled
                              ? "time-select-item opacity-40 cursor-not-allowed"
                              : "time-select-item"
                          }
                        >
                          <span>{time}</span>
                          <span>{disabled && "ocupado"}</span>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <InputGroupAddon>
                  <Clock2Icon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        )}
      </CardFooter>
    </Card>
  )
}