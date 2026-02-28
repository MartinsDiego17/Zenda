import { Clock, DollarSign } from "lucide-react";
import { TitleSectionSettings } from "./TitleSectionSettings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DurationSectionProps {
    sessionDurationMinutes: number;
    onChange: (minutes: number) => void;
}

export const DurationSection = ({ sessionDurationMinutes, onChange }: DurationSectionProps) => {
    return (
        <div className="shadow-container h-[50%] p-5">
            <TitleSectionSettings LucideIcon={Clock} title="Duración de la sesión" />
            <div className="mt-4">
                <Select value={String(sessionDurationMinutes)} onValueChange={(val) => onChange(Number(val))}>
                    <SelectTrigger className="w-full border border-(--color-secondary-transparent) bg-(--color-secondary-transparent) text-(--color-primary) rounded-lg focus:ring-2 focus:ring-(--color-primary) focus:border-(--color-primary-transparent) hover:border-(--color-primary-transparent) transition-colors">
                        <SelectValue placeholder="Seleccionar duración" />
                    </SelectTrigger>
                    <SelectContent className="border border-(--color-primary-transparent) bg-white rounded-lg shadow-lg">
                        <SelectItem value="30" className="text-(--color-primary) hover:bg-(--color-terciary-transparent) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer">30 minutos</SelectItem>
                        <SelectItem value="45" className="text-(--color-primary) hover:bg-(--color-terciary-transparent) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer">45 minutos</SelectItem>
                        <SelectItem value="60" className="text-(--color-primary) hover:bg-(--color-terciary-transparent) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer">60 minutos</SelectItem>
                        <SelectItem value="90" className="text-(--color-primary) hover:bg-(--color-terciary-transparent) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer">90 minutos</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <hr className="my-6" />
            <TitleSectionSettings LucideIcon={DollarSign} title="Seña obligatoria" />
        </div>
    );
};