import { CalendarDays } from "lucide-react";
import { TitleSectionSettings } from "./TitleSectionSettings";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ALL_DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

interface DaysSectionProps {
    days: string[];
    handler: (workDays: string[]) => void;
}

export const DaysSection = ({ days, handler }: DaysSectionProps) => {

    const firstActive = days[0];
    const lastActive = days[days.length - 1];

    const isRemovable = (day: string) => {
        if (!days.includes(day)) return false;
        return day === firstActive || day === lastActive;
    };

    const handleChange = (day: string, checked: boolean) => {
        const updated = checked
            ? ALL_DAYS.filter((d) => days.includes(d) || d === day)
            : days.filter((d) => d !== day);

        handler(updated);
    };

    return (
        <div className="h-[25%] shadow-container p-5">
            <TitleSectionSettings LucideIcon={CalendarDays} title="Días laborales" />
            <div className="mt-4 flex gap-x-3 flex-wrap">
                {ALL_DAYS.map((day) => {
                    const isActive = days.includes(day);
                    const disabled = isActive && !isRemovable(day);

                    return (
                        <div key={day} className="flex items-center gap-1.5">
                            <Checkbox
                                id={day}
                                checked={isActive}
                                disabled={disabled}
                                onCheckedChange={(checked) => handleChange(day, !!checked)}
                                className={isActive ? "border-none data-[state=checked]:bg-(--color-primary)" : ""}
                            />
                            <Label
                                htmlFor={day}
                                className={isActive ? "font-medium" : "text-muted-foreground"}
                            >
                                {day}
                            </Label>
                        </div>
                    );
                })}
            </div>
            <p className="mt-4 text-[.75rem] opacity-60">Para inhabilitar días intermedios, podés gestionarlo mediante bloqueos manuales en tu agenda.</p>
        </div>
    );
};