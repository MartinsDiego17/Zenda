import { Building } from "lucide-react";
import { TitleSectionSettings } from "./TitleSectionSettings";
interface LocationSectionProps {
    isPresencial: boolean
    address: string
}

export const LocationSection = ({ isPresencial, address } : LocationSectionProps) => {
    return (
        <div className={`h-[25%] shadow-container p-5 ${!isPresencial && "section-disabled"}`}>
            <TitleSectionSettings LucideIcon={Building} title="Ubicación del consultorio" />
            <div className="mt-4">
                <input 
                    placeholder="Ingresar dirección"
                    className="input-location"
                    value={address}
                />
            </div>
        </div>
    );
};
