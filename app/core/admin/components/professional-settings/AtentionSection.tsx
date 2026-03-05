import { Clock } from "lucide-react";
import { TitleSectionSettings } from "./TitleSectionSettings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AtentionSectionProps {
    workStartTime: string;
    workEndTime: string;
    onChangeStartTime: (time: string) => void;
    onChangeEndTime: (time: string) => void;
}

const TIME_OPTIONS = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00"
];

const MAX_TIME = TIME_OPTIONS[TIME_OPTIONS.length - 1];

const timestampToUI = (timestamp: string): string => timestamp.slice(0, 5);
const uiToTimestamp = (time: string): string => `${time}:00`;

export const AtentionSection = ({
    workStartTime,
    workEndTime,
    onChangeStartTime,
    onChangeEndTime,
}: AtentionSectionProps) => {

    const currentStart = timestampToUI(workStartTime);
    const currentEnd = timestampToUI(workEndTime);

    const handleStartChange = (val: string) => {
        onChangeStartTime(uiToTimestamp(val));
        if (val >= currentEnd) {
            const nextIndex = TIME_OPTIONS.indexOf(val) + 1;
            onChangeEndTime(uiToTimestamp(TIME_OPTIONS[nextIndex]));
        }
    };

    const handleEndChange = (val: string) => {
        onChangeEndTime(uiToTimestamp(val));
    };

    const startOptions = TIME_OPTIONS.filter((time) => time !== MAX_TIME);

    const endOptions = TIME_OPTIONS.filter((time) => time > currentStart);

    return (
        <div className="shadow-container p-5 h-[40%]">
            <TitleSectionSettings LucideIcon={Clock} title="Horarios de atención" />
            <div className="mt-4 flex items-center gap-x-3">
                <Select value={currentStart} onValueChange={handleStartChange}>
                    <SelectTrigger className="w-full border border-(--color-secondary-transparent) bg-(--color-secondary-transparent) text-(--color-primary) rounded-lg focus:ring-2 focus:ring-(--color-primary) hover:border-(--color-primary-transparent) transition-colors">
                        <SelectValue placeholder="Inicio" />
                    </SelectTrigger>
                    <SelectContent className="border border-(--color-primary-transparent) bg-white rounded-lg shadow-lg">
                        {startOptions.map((time) => (
                            <SelectItem
                                key={time}
                                value={time}
                                className="text-(--color-primary) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer"
                            >
                                {time}hs
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <span className="text-(--color-primary) font-medium">-</span>

                <Select value={currentEnd} onValueChange={handleEndChange}>
                    <SelectTrigger className="w-full border border-(--color-secondary-transparent) bg-(--color-secondary-transparent) text-(--color-primary) rounded-lg focus:ring-2 focus:ring-(--color-primary) hover:border-(--color-primary-transparent) transition-colors">
                        <SelectValue placeholder="Fin" />
                    </SelectTrigger>
                    <SelectContent className="border border-(--color-primary-transparent) bg-white rounded-lg shadow-lg">
                        {endOptions.map((time) => (
                            <SelectItem
                                key={time}
                                value={time}
                                className="text-(--color-primary) focus:bg-(--color-secondary-transparent) focus:text-(--color-primary) cursor-pointer"
                            >
                                {time}hs
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};