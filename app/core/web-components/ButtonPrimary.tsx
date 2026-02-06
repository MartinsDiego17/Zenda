import { Button } from "@/components/ui/button";
import "./web-components.css";
import { ReactNode } from "react";

interface ButtonPrimaryProps {
  children: ReactNode;
}

export const ButtonPrimary = ({ children }: ButtonPrimaryProps) => {
  return (
    <Button id="button-personalized" className="primary">
      {children}
    </Button>
  );
};
