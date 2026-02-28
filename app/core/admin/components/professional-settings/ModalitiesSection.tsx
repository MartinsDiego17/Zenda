import { Video } from "lucide-react";
import { TitleSectionSettings } from "./TitleSectionSettings";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SessionModality } from "@/schemas/professional_settings";

interface ModalitiesProps {
    modalities: string;
    onChange: (modalities: SessionModality) => void;
}

export const ModalitiesSection = ({ modalities, onChange }: ModalitiesProps) => {
    const isVirtual = modalities === "Virtual" || modalities === "BOTH";
    const isPresencial = modalities === "Presencial" || modalities === "BOTH";
    const isBoth = modalities === "BOTH";

    const handleChange = (type: "Virtual" | "Presencial", checked: boolean) => {
        const newVirtual = type === "Virtual" ? checked : isVirtual;
        const newPresencial = type === "Presencial" ? checked : isPresencial;

        if (newVirtual && newPresencial) onChange("BOTH");
        else if (newVirtual) onChange("Virtual");
        else if (newPresencial) onChange("Presencial");
    };

    return (
        <div className="h-[25%] shadow-container p-5">
            <TitleSectionSettings LucideIcon={Video} title="Modalidades de sesión" />
            <div className="mt-4 flex  gap-x-4">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="virtual"
                        checked={isVirtual}
                        onCheckedChange={(checked) => handleChange("Virtual", !!checked)}
                        className={isVirtual ? "data-[state=checked]:bg-(--color-primary) border-none" : ""}
                    />
                    <Label htmlFor="virtual">Virtual</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="presencial"
                        checked={isPresencial}
                        onCheckedChange={(checked) => handleChange("Presencial", !!checked)}
                        className={isPresencial ? "data-[state=checked]:bg-(--color-primary) border-none" : ""}
                    />
                    <Label htmlFor="presencial">Presencial</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="both"
                        checked={isBoth}
                        onCheckedChange={(checked) => checked && onChange("BOTH")}
                        className={isPresencial && isVirtual ? "data-[state=checked]:bg-(--color-primary) border-none" : ""}
                    />
                    <Label htmlFor="both">Ambas</Label>
                </div>
            </div>
        </div>
    );
};