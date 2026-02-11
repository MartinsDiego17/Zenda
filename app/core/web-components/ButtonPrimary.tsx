import { Button } from "@/components/ui/button";
import "./web-components.css";
import { ReactNode } from "react";

interface ButtonPrimaryProps {
  children: ReactNode;
  handler?: () => void
}

export const ButtonPrimary = ({ children, handler }: ButtonPrimaryProps) => {
  return (
    <Button onClick={handler} id="button-personalized" className="primary">
      {children}
    </Button>
  );
};
