import { Button } from "@/components/ui/button";
import "./web-components.css";
import { ReactNode } from "react";

interface ButtonPrimaryProps {
  children: ReactNode;
  handler?: () => void
  disabled?: boolean
}

export const ButtonPrimary = ({ children, handler, disabled=false }: ButtonPrimaryProps) => {
  return (
    <Button disabled={disabled} onClick={handler} id="button-personalized" className="primary">
      {children}
    </Button>
  );
};
