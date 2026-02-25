"use client"
import { Calendar } from "@/components/ui/calendar"
import { es } from "date-fns/locale"

interface CalendarShadProps {
  date: Date
  onSelectDate: (date: Date) => void
}

export const CalendarShad = ({ date, onSelectDate }: CalendarShadProps) => {
  return (
    <Calendar
      locale={es}
      mode="single"
      selected={date}
      onSelect={(selectedDate) => {
        if (selectedDate) {
          onSelectDate(selectedDate)
        }
      }}
      id="calendar-shadcn-accesorie"
      className="rounded-[15px] bg-transparent w-full"
      captionLayout="dropdown"
    />
  )
}