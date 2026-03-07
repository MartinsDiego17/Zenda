import { useState } from "react";
import { ArrowRight, InfoIcon, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Profile } from "@/schemas/profile";

interface ModalCompleteProfileProps {
    profile: Profile | undefined
    setLocalProfile: (profile: Profile) => void
    handleSubmitUserData: ({ profile }: { profile: Profile | undefined }) => Promise<void>
}

export const ModalCompleteProfile = ({ profile, setLocalProfile, handleSubmitUserData }: ModalCompleteProfileProps) => {

    const [open, setOpen] = useState(false);
    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleChange = (field: "full_name" | "birth_date", value: string) => {
        setLocalProfile({
            ...profile,
            [field]: value,
        } as Profile);
    };

    const handleNameChange = (field: "first_name" | "last_name", value: string) => {
        const updatedFirst = field === "first_name" ? value : firstName;
        const updatedLast = field === "last_name" ? value : lastName;

        if (field === "first_name") setFirstName(value);
        if (field === "last_name") setLastName(value);

        handleChange("full_name", `${updatedFirst} ${updatedLast}`.trim());
    };

    const handleSubmit = async () => {
        await handleSubmitUserData({ profile });
        setOpen(false);
    }

    return (
        <>
            <div className="mt-4 flex gap-x-2 place-items-center">
                <p className="flex place-items-center gap-x-2 text-[.8rem] opacity-70">
                    <span><InfoIcon size={15} /></span>
                    <span>Completá tu perfil para acceder a todas las funciones de Zenda</span>
                </p>
                <Button
                    onClick={() => setOpen(true)}
                    className="button-open-modal-complete-profile"
                >
                    <span>Completar ahora</span>
                    <span><ArrowRight /></span>
                </Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-9 h-9 rounded-[10px] bg-(--color-terciary-transparent)">
                                <UserCircle className="w-5 h-5 text-(--color-primary)" />
                            </div>
                            <DialogTitle className="text-lg font-semibold">
                                Completá tu perfil
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-sm text-muted-foreground pt-1">
                            Completá tu información para que podamos brindarte la mejor experiencia
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-5 py-2">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="first_name">Nombre</Label>
                            <Input
                                id="first_name"
                                placeholder="Ej: Nahuel"
                                onChange={(e) => handleNameChange("first_name", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="last_name">Apellido</Label>
                            <Input
                                id="last_name"
                                placeholder="Ej: García"
                                onChange={(e) => handleNameChange("last_name", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label>Fecha de nacimiento</Label>
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !birthDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {birthDate
                                            ? format(birthDate, "d 'de' MMMM 'de' yyyy", { locale: es })
                                            : "Seleccioná una fecha"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={birthDate}
                                        onSelect={(date) => {
                                            setBirthDate(date);
                                            setCalendarOpen(false);
                                            if (date) handleChange("birth_date", format(date, "yyyy-MM-dd"));
                                        }}
                                        locale={es}
                                        captionLayout="dropdown"
                                        fromYear={1920}
                                        toYear={new Date().getFullYear() - 1}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 pt-2">
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="rounded-full bg-(--color-primary) text-white"
                        >
                            Guardar datos
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};