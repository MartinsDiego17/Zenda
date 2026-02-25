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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ButtonSecondary } from "../../web-components/ButtonSecondary";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import dayjs from "dayjs";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void;
    openBlockDialog: () => void;

    blockDate: string;
    setBlockDate: (v: string) => void;

    blockStartTime: string;
    setBlockStartTime: (v: string) => void;

    blockEndTime: string;
    setBlockEndTime: (v: string) => void;

    timeSlots: string[];
    filteredEndTimes: string[];

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
    filteredEndTimes,
    isValid,
    onSubmit
}: Props) => {

    return (
        <>
            <Button id="button-block" onClick={openBlockDialog} >
                <span><Plus className="size-4" /></span>
                <span>Bloqueo manual</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Nuevo bloqueo manual</DialogTitle>
                        <DialogDescription>
                            Bloqueá un rango horario para impedir nuevas reservas en ese período
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-5 py-2">

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="block-date">
                                <CalendarDays className="size-3.5 text-muted-foreground" />
                                Fecha
                            </Label>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="justify-start text-left font-normal"
                                    >
                                        {blockDate
                                            ? dayjs(blockDate).format("DD/MM/YYYY")
                                            : "Seleccionar fecha"}
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={
                                            blockDate
                                                ? dayjs(blockDate, "YYYY-MM-DD").toDate()
                                                : undefined
                                        }
                                        onSelect={(date) => {
                                            if (!date) return;
                                            setBlockDate(dayjs(date).format("YYYY-MM-DD"));
                                        }}
                                        disabled={(date) =>
                                            dayjs(date).isBefore(dayjs().startOf("day"))
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="block-start">
                                    <Clock className="size-3.5 text-muted-foreground" />
                                    Hora inicio
                                </Label>
                                <Select
                                    value={blockStartTime}
                                    onValueChange={(v) => {
                                        setBlockStartTime(v);
                                        if (blockEndTime && v >= blockEndTime)
                                            setBlockEndTime("");
                                    }}
                                >
                                    <SelectTrigger id="block-start">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map((t) => (
                                            <SelectItem key={t} value={t}>
                                                {t + " hs"}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="block-end">
                                    <Clock className="size-3.5 text-muted-foreground" />
                                    Hora fin
                                </Label>
                                <Select
                                    value={blockEndTime}
                                    onValueChange={setBlockEndTime}
                                    disabled={!blockStartTime}
                                >
                                    <SelectTrigger id="block-end">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredEndTimes.map((t) => (
                                            <SelectItem key={t} value={t}>
                                                {t + " hs"}
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
                        <Button className="rounded-full bg-(--color-primary) hover:bg-(--color-primary-hover) cursor-pointer" onClick={onSubmit} disabled={!isValid}>
                            Crear bloqueo
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};