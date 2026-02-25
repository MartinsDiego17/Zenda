import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock } from "lucide-react";

interface Props {
    handleDeleteSubmit: () => void
    reservationId: string
    open: boolean;
    onOpenChange: (open: boolean) => void;
    start: string;
    end: string;
    date: string;
}

export const ModalDeleteReservation = ({
    handleDeleteSubmit,
    open,
    onOpenChange,
    start,
    end,
    date
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Eliminar bloqueo manual</DialogTitle>
                    <div className="mt-4 flex flex-col gap-y-2">
                        <p className="text-[.8rem] opacity-70 flex place-items-center gap-x-2">
                            <span className="text-(--color-primary-hover)"><Calendar size={15} /></span>
                            <span>{date}</span>
                        </p>
                        <p className="text-[.8rem] opacity-70 flex place-items-center gap-x-2">
                            <span className="text-(--color-primary-hover)"><Clock size={15} /></span>
                            <span>{start}{" - "}{end}</span>
                        </p>
                    </div>
                </DialogHeader>
                <div className="flex justify-end gap-x-2 place-items-center">
                    <Button
                        className="cursor-pointer rounded-full border border-[#ccc] bg-transparent text-black opacity-80 hover:bg-(--color-secondary-transparent)"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteSubmit} className="bg-(--color-primary) hover:bg-(--color-primary-hover) cursor-pointer rounded-full" >Confirmar</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};