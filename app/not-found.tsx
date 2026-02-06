import Link from "next/link";
import { ButtonPrimary } from "./core/web-components/ButtonPrimary";
import "./globals.css";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="not-found-container w-screen h-screen flex flex-col justify-center place-items-center pb-40">
            <h1 className="text-[10rem] font-extrabold text-(--color-primary)">Oops!</h1>
            <h2 className="font-extrabold text-xl mt-2 tracking-[2px]">404 - PÁGINA NO ENCONTRADA</h2>
            <p className="text-(--color-text-primary) opacity-80 w-[30vw] text-center mt-5">
                Es posible que la página que estás buscando haya sido eliminada, hayan cambiado su nombre o no esté disponible temporalmente
            </p>
            <Link href={"/"} className="mt-8">
                <ButtonPrimary>
                    <span><ArrowLeft /></span>
                    <span>Volver al inicio</span>
                </ButtonPrimary>
            </Link>
        </div>
    );
};
