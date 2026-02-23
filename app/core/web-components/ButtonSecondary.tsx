import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface ButtonSecondaryProps {
  children: ReactNode
  onClick?: () => void
  isButtonSelected?: boolean
}

export const ButtonSecondary = ({ children, onClick, isButtonSelected }: ButtonSecondaryProps) => {
  return (
    <Button
      onClick={onClick}
      id="button-personalized"
      className={`secondary ${isButtonSelected ? "button-selected" : ""}`}
    >
      {children}
    </Button>
  )
}
