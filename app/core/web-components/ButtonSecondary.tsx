import { Button } from "@/components/ui/button";
import "./web-components.css";
import { ReactNode } from "react";

interface ButtonPrimaryProps {
  children: ReactNode;
}

export const ButtonSecondary = ({ children }: ButtonPrimaryProps) => {
  return (
    <Button id="button-personalized" className="secondary">
      {children}
    </Button>
  );
};
