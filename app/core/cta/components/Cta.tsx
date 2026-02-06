import { User2Icon } from "lucide-react";
import { ButtonPrimary } from "../../web-components/ButtonPrimary";
import { ButtonSecondary } from "../../web-components/ButtonSecondary";
import Link from "next/link";

export const Cta = () => {
    return (
        <div className="w-screen h-fit py-30 flex place-items-center justify-center pb-100">
            <section className="w-[60vw] h-[40vh] flex place-items-center justify-between">

                <article className="w-1/2">
                    <h2 className="text-4xl leading-none mb-5 text-(--color-text-primary) font-bold">Crea una cuenta<br />y reserva tu sesión</h2>
                    <h2 className="font-light text-4xl text-(--color-text-primary)">O inicia sesión</h2>
                </article>

                <article className="w-1/2 flex place-items-center justify-end gap-x-5">
                    <Link href={"/register"}>
                        <ButtonPrimary>
                            <span><User2Icon /></span>
                            <span>Registrarse</span>
                        </ButtonPrimary>
                    </Link>
                    <Link href={"/login"}>
                        <ButtonSecondary>
                            <span>Iniciar sesión</span>
                        </ButtonSecondary>
                    </Link>
                </article>

            </section>
        </div>
    );
};
