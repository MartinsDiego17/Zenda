import Link from "next/link";
import { Logo } from "../../web-components/Logo";
import "./footer.css";

export const FooterVisitor = () => {
    return (
        <footer className="bottom-0 absolute footer-visitor-container w-screen py-20 flex justify-center">

            <section className="w-[70vw] flex flex-col place-items-center ">
                <div className="flex place-items-center justify-center gap-x-25 mb-20">
                    <ul className="flex gap-x-10">
                        <li>POR QUÉ ZENDA</li>
                        <li>PARA QUIÉN ES</li>
                    </ul>

                    <Logo />

                    <ul className="flex gap-x-10">
                        <li>MODALIDADES DE SESIÓN</li>
                        <li>EMPEZAR</li>
                    </ul>
                </div>


                <div>
                    <p className="font-extralight">© 2026 - Zenda. Casi todos los derechos reservados</p>
                    <p className="mt-2 font-semibold text-center flex gap-x-2 justify-center">
                        <span>Desarrollado por</span>
                        <span>
                            <Link href={"https://www.linkedin.com/in/diego-martins-563954278/"} target="_blank">
                                Diego Martins
                            </Link>
                        </span>
                    </p>
                </div>

            </section>
        </footer>
    );
};
