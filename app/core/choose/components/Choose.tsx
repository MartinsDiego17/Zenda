import brain_image from "../../../../public/choose/brain.jpg";
import Image from "next/image";
import "./choose.css"
import { CardChoose } from "./CardChoose";

export const Choose = () => {
    return (
        <section id="zenda" className="choose-container w-screen h-fit flex justify-center">
            <div className="w-[70vw] h-screen">
                <section>

                    <article className="w-full h-[45vh] flex justify-between">
                        <span>
                            <Image src={brain_image.src} width={1000} height={1000} alt="brain-image" />
                        </span>
                        <div className="p-20 pr-0 w-full title">
                            <h1 className="text-7xl font-semibold text-balance text-(--color-text-primary)">POR QUÉ UTILIZAR ZENDA</h1>
                        </div>
                    </article>

                    <article className="flex justify-between mt-5 gap-x-10">
                        <CardChoose title="¿Cuáles son sus beneficios?" content="Zenda simplifica la reserva de turnos, reduce errores de coordinación y mejora la experiencia tanto para el profesional como para el paciente." />
                        <CardChoose title="Gestión y organización" content="Centralizá tu agenda, definí horarios disponibles y administrá sesiones, pagos y cancelaciones desde un solo lugar, de forma ordenada y eficiente." />
                    </article>

                </section>
            </div>
        </section>
    );
};
