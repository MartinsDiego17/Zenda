import { Clock, DollarSign } from "lucide-react";
import { TitleSectionSettings } from "./TitleSectionSettings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface DurationSectionProps {
    sessionDurationMinutes: number;
    onChange: (minutes: number) => void;
    requiresDeposit: boolean;
    depositAmount: number;
    onChangeRequiresDeposit: (value: boolean) => void;
    onChangeDepositAmount: (amount: number) => void;
}

export const DurationSection = ({
    sessionDurationMinutes,
    onChange,
    requiresDeposit,
    depositAmount,
    onChangeRequiresDeposit,
    onChangeDepositAmount,
}: DurationSectionProps) => {
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
            <div className="mt-4 flex flex-col gap-y-3">
                <RadioGroup
                    value={requiresDeposit ? "si" : "no"}
                    onValueChange={(val) => onChangeRequiresDeposit(val === "si")}
                    className="flex gap-x-6"
                >
                    <div className="flex items-center gap-x-2">
                        <RadioGroupItem value="si" id="deposit-si" />
                        <Label htmlFor="deposit-si" className="cursor-pointer">Sí</Label>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <RadioGroupItem value="no" id="deposit-no" />
                        <Label htmlFor="deposit-no" className="cursor-pointer">No</Label>
                    </div>
                </RadioGroup>

                <div className={`flex items-center gap-x-2 rounded-lg p-2 transition-colors ${!requiresDeposit ? "section-disabled" : ""}`}>
                    <span className="bg-(--color-terciary-transparent) text-(--color-primary) p-2 rounded-[10px]">
                        <DollarSign size={15} strokeWidth={3} className="opacity-60" />
                    </span>
                    <Input
                        type="number"
                        value={requiresDeposit ? (depositAmount || "") : ""}
                        onChange={(e) => onChangeDepositAmount(e.target.value === "" ? 0 : Number(e.target.value))}
                        placeholder="0"
                    />
                </div>
            </div>
        </div>
    );
};