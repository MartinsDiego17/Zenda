import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";


interface ModalLogoutProps {
    handler: () => void
}

export const ModalLogout = ({ handler }: ModalLogoutProps) => {
    return (
        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button id="button-personalized" className="primary">
                    <span>Cerrar sesión</span>
                    <span><LogOut /></span>
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Vas a salir de tu cuenta actual.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="button-modal-logout ">Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="button-modal-logout button-confirm-modal-logout" onClick={handler}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    )
}


