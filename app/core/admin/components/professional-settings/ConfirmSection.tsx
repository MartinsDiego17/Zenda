import { ButtonPrimary } from "@/app/core/web-components/ButtonPrimary";
import { Loader2, Save } from "lucide-react";

interface ConfirmSectionProps {
    isDisabled: boolean;
    isLoading: boolean;
    onConfirm: () => void;
}

export const ConfirmSection = ({ isDisabled, isLoading, onConfirm }: ConfirmSectionProps) => {
    return (
        <div className={`h-[10%] flex flex-col justify-end ${isDisabled && "section-disabled"}`}>
            <ButtonPrimary handler={onConfirm} disabled={isDisabled || isLoading}>
                {isLoading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Guardando...</span></>
                    : <><span><Save /></span><span>Guardar cambios</span></>
                }
            </ButtonPrimary>
        </div>
    );
};