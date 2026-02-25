"use client"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

interface CalendarShadProps {
  date: Date
  onSelectDate: (date: Date) => void
}

export const CalendarShad = ({ date, onSelectDate }: CalendarShadProps) => {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(selectedDate) => {
        if (selectedDate) {
          onSelectDate(selectedDate)
        }
      }}
      className="rounded-lg border w-full"
      captionLayout="dropdown"
    />
  )
}