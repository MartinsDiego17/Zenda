import { CalendarDays, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import dayjs from "dayjs";
import { useState } from "react";

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
    openBlockDialog: () => void;

    blockDate: string;
    setBlockDate: (v: string) => void;

    blockStartTime: string;
    setBlockStartTime: (v: string) => void;

    blockEndTime: string;
    setBlockEndTime: (v: string) => void;

    timeSlots: string[];
    validEndTimes: string[];

    canStartAt: (time: string) => boolean;

    isValid: boolean;
    onSubmit: () => void;
}

export const ButtonManualBlock = ({
    open,
    setOpen,
    openBlockDialog,
    blockDate,
    setBlockDate,
    blockStartTime,
    setBlockStartTime,
    blockEndTime,
    setBlockEndTime,
    timeSlots,
    validEndTimes,
    canStartAt,
    isValid,
    onSubmit,
}: Props) => {

    const isDateValid =
        !!blockDate &&
        !dayjs(blockDate, "YYYY-MM-DD").isBefore(dayjs().startOf("day"));

    const [localDisabled, setLocalDisabled] = useState(false);

    return (
        <>
            <Button id="button-block" onClick={openBlockDialog}>
                <Plus className="size-4" />
                Bloqueo manual
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nuevo bloqueo manual</DialogTitle>
                        <DialogDescription>
                            Bloqueá un rango horario sin solapamientos
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        <Label>
                            <CalendarDays className="size-4" /> Fecha
                        </Label>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">
                                    {blockDate
                                        ? dayjs(blockDate).format("DD/MM/YYYY")
                                        : "Seleccionar fecha"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={blockDate ? dayjs(blockDate).toDate() : undefined}
                                    onSelect={(d) =>
                                        d && setBlockDate(dayjs(d).format("YYYY-MM-DD"))
                                    }
                                    disabled={(d) =>
                                        dayjs(d).isBefore(dayjs().add(1, "day").startOf("day"))
                                    }
                                />
                            </PopoverContent>
                        </Popover>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label><Clock className="size-4" /> Inicio</Label>
                                <Select
                                    value={blockStartTime}
                                    onValueChange={(v) => {
                                        setBlockStartTime(v);
                                        setBlockEndTime("");
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map(t => (
                                            <SelectItem
                                                key={t}
                                                value={t}
                                                disabled={!canStartAt(t)}
                                            >
                                                {t} hs
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label><Clock className="size-4" /> Fin</Label>
                                <Select
                                    value={blockEndTime}
                                    onValueChange={setBlockEndTime}
                                    disabled={!blockStartTime}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {validEndTimes.map(t => (
                                            <SelectItem key={t} value={t}>
                                                {t} hs
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button className="cursor-pointer rounded-full" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            className="rounded-full bg-(--color-primary) hover:bg-(--color-primary-hover) cursor-pointer"
                            onClick={() => {
                                onSubmit()
                                setLocalDisabled(true);
                            }}
                            disabled={!isValid || !isDateValid || localDisabled}>
                            Crear bloqueo
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};