import { Calendar } from "lucide-react";
import { TitleSectionSettings } from "./TitleSectionSettings";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface WindowDaysSectionProps {
    value: number;
    onChange: (days: number) => void;
}

export const WindowDaysSection = ({ value, onChange }: WindowDaysSectionProps) => {
    return (
        <div className="h-[25%] shadow-container p-5">
            <TitleSectionSettings LucideIcon={Calendar} title="Ventana de reserva" />
            <div className="mt-4">
                <Select
                    value={String(value)}
                    onValueChange={(val) => onChange(Number(val))}
                >
                    <SelectTrigger className="w-full border border-(--color-secondary-transparent) bg-(--color-secondary-transparent) text-(--color-primary) rounded-lg focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary-transparent) hover:border-(--color-primary-transparent) transition-colors">
                        <SelectValue placeholder="Seleccionar días" />
                    </SelectTrigger>
                    <SelectContent className="border border-(--color-primary-transparent) bg-white rounded-lg shadow-lg">
                        <SelectItem value="7" className="text-(--color-primary) hover:bg-(--color-terciary-transparent) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer">7 días</SelectItem>
                        <SelectItem value="14" className="text-(--color-primary) hover:bg-(--color-terciary-transparent) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer">14 días</SelectItem>
                        <SelectItem value="30" className="text-(--color-primary) hover:bg-(--color-terciary-transparent) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer">30 días</SelectItem>
                        <SelectItem value="60" className="text-(--color-primary) hover:bg-(--color-terciary-transparent) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer">60 días</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <p className="mt-4 text-[.75rem] opacity-60">Cantidad de días hacia adelante que tus pacientes pueden ver disponibilidad y reservar un turno.</p>
        </div>
    );
};