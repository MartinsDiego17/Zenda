import Image from "next/image";
import "./modalities.css";
import presencial_image from "../../../../public/modalities/presencial.png";
import virtual_image from "../../../../public/modalities/virtual.png";

export const Modalities = () => {
    return (
        <div className="w-screen h-fit py-20 flex justify-center place-items-center pt-30">

            <section className="h-full w-[70vw]">
                <h1 className="text-4xl font-bold text-center text-(--color-text-primary)">Modalidades de sesión</h1>
                <div className="flex justify-center gap-x-30 place-items-center mt-30">
                    <article className="card-modalitie-container">
                        <Image
                            src={presencial_image.src}
                            alt="divan-image"
                            width={600}
                            height={600}
                        />
                        <div className="p-8">
                            <h3 className="text-xl font-semibold text-(--color-text-primary)">Presencial</h3>
                            <p className="mt-3 opacity-90 text-(--color-text-primary)">Sesiones realizadas en el consultorio del profesional, en un espacio preparado para brindar contención, privacidad y una experiencia terapéutica cercana.</p>
                        </div>
                    </article>
                    <article className="card-modalitie-container">
                        <Image
                            src={virtual_image.src}
                            alt="phone-image"
                            width={600}
                            height={600}
                        />
                        <div className="p-8">
                            <h3 className="text-xl font-semibold text-(--color-text-primary)">Virtual</h3>
                            <p className="mt-3 opacity-90 text-(--color-text-primary)">
                                Sesiones realizadas de manera online, permitiendo acceder a la atención profesional desde cualquier lugar, de forma cómoda, segura y flexible.
                            </p>
                        </div>
                    </article>
                </div>

            </section>
        </div>
    );
};
