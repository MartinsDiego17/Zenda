import { Building } from "lucide-react";
import { TitleSectionSettings } from "./TitleSectionSettings";

interface LocationSectionProps {
    isPresencial: boolean
    address: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const LocationSection = ({ isPresencial, address, onChange }: LocationSectionProps) => {
    const isEmpty = isPresencial && !address.trim();

    return (
        <div className={`h-[25%] shadow-container p-5 ${!isPresencial && "section-disabled"}`}>
            <TitleSectionSettings LucideIcon={Building} title="Ubicación del consultorio" />
            <div className="mt-4">
                <input
                    placeholder="Ingresar dirección"
                    className={`input-location ${isEmpty ? "empty" : ""}`}
                    onChange={(e) => onChange(e)}
                    value={address}
                />
            </div>
        </div>
    );
};