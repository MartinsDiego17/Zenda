import { CalendarIcon } from "lucide-react";
import { ButtonPrimary } from "../../web-components/ButtonPrimary";
import "./hero.css";
import { Logo } from "../../web-components/Logo";
import { ButtonSecondary } from "../../web-components/ButtonSecondary";
import Link from "next/link";

export const Hero = () => {
    return (
        <div className="hero-container w-screen h-screen flex flex-col justify-center place-items-center">
            <Logo />
            <h1 className="text-7xl font-semibold text-center mt-0 mb-5">Reserva tus sesiones de <br /> manera ordenada</h1>
            <p className="w-[40%] text-center mb-14 opacity-50">
                Zenda te ayuda a organizar sesiones de salud mental de forma clara y profesional,
                optimizando tu agenda y mejorando la experiencia entre profesional y paciente.
            </p>
            <div className="flex gap-x-5">
                <Link href={"/register"}>
                    <ButtonPrimary>
                        <span><CalendarIcon /></span>
                        <span>Reservar sesión</span>
                    </ButtonPrimary>
                </Link>
                <Link href={"#zenda"}>
                    <ButtonSecondary>
                        <span>Sobre Zenda</span>
                    </ButtonSecondary>
                </Link>
            </div>
        </div>
    );
};
