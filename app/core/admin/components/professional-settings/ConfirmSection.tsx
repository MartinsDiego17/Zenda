import { ButtonPrimary } from "@/app/core/web-components/ButtonPrimary";
import { Save } from "lucide-react";

export const ConfirmSection = () => {
    return (
        <div className="h-[10%] flex flex-col justify-end">
            <ButtonPrimary>
                <span><Save /></span>
                <span>Guardar cambios</span>
            </ButtonPrimary>
        </div>
    );
};
