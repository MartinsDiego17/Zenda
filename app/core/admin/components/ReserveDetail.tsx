"use client";

import { Reservation } from "@/schemas/reservations";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentReservation } from "../utils/getCurrentReservation";
import { Calendar, CalendarDays, Clock, Mail, MapPin, User, Video } from "lucide-react";
import { getDateInfo } from "../../dashboard/utils/getDateInfo";
import { Profile } from "@/schemas/profile";
import { useAuthStore } from "@/store/AuthStore";

export const ReserveDetail = () => {

    const params = useParams();
    const id = params.id as string;

    const currentFindOneUser = useAuthStore(state => state.findOneUser);
    const [currentReservation, setCurrentReservation] = useState<Reservation>();
    const [localUser, setLocalUser] = useState<Profile | null>();

    useEffect(() => {
        if(!id) console.log("HOLAA")
        const fetchReservation = async () => {
            const localReservation: Reservation = await getCurrentReservation({ reservationId: id });
            const userFound = await currentFindOneUser({ userId: localReservation.client_id });
            setLocalUser(userFound);
            setCurrentReservation(localReservation)
            return localReservation;
        }

        fetchReservation();
    }, [id]);

    const infoDate = getDateInfo({ start_time: currentReservation?.start_time || "", end_time: currentReservation?.end_time || "" });

    return (
        <div>

            {
                currentReservation &&
                <>
                    <div className="flex place-items-center w-[40vw] justify-between">
                        <div className="text-[.9rem] flex gap-x-4 place-items-center">
                            <p className="flex gap-x-2 opacity-70 place-items-center">
                                <span><Calendar size={15} /></span>
                                <span>{infoDate.date}</span>
                            </p>
                            <span className="opacity-20">|</span>
                            <p className="flex gap-x-2 opacity-70 place-items-center">
                                <span><Clock size={15} /></span>
                                <span>{infoDate.schedule}</span>
                            </p>
                        </div>
                        <div>
                            <p className="chip-modality gap-x-2 flex place-items-center text-[.8rem]">
                                <span>
                                    {
                                        currentReservation?.session_modality === "Virtual"
                                            ? <Video size={13} />
                                            : <MapPin size={13} />
                                    }
                                </span>
                                <span>{currentReservation?.session_modality}</span>
                            </p>
                        </div>
                    </div>

                    <section className="mt-10 flex flex-col gap-y-6">
                        <article className="card-info-detail">
                            <h2 className="font-bold flex place-items-center gap-x-2">
                                <span className="opacity-50"><User strokeWidth={1.5} size={18} /></span>
                                <span>Datos del cliente</span>
                            </h2>
                            <div className="mt-8 flex place-items-center gap-x-4">
                                <div className="rounded-full bg-(--color-terciary-transparent) w-fit p-3 font-bold text-(--color-primary)">
                                    <span>{localUser?.full_name[0]}{localUser?.full_name.split(" ")[1][0]}</span>
                                </div>
                                <div>
                                    <h2 className="font-bold opacity-80 flex place-items-center gap-x-2">{localUser?.full_name}</h2>
                                    <div className="flex place-items-center gap-x-6">
                                        <h4 className="mt-2 opacity-70 text-[.9rem] flex place-items-center gap-x-2">
                                            <span><Mail size={15} /></span>
                                            <span>{localUser?.email}</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article className="card-info-detail">
                            <h2 className="font-bold flex place-items-center gap-x-2">
                                <span className="opacity-50"><CalendarDays strokeWidth={1.5} size={18} /></span>
                                <span>Detalles de la reserva</span>
                            </h2>

                            <section className="mb-6 mt-8 flex  place-items-center gap-x-40">
                                <article>
                                    <h3 className="opacity-70 text-[.8rem]">FECHA DE RESERVA</h3>
                                    <h4 className="mt-2 font-bold text-[.8rem]">{infoDate.date}, {infoDate.schedule}</h4>
                                </article>

                                <article>
                                    <h3 className="opacity-70 text-[.8rem]">MODALIDAD</h3>
                                    <div>
                                        <p className="gap-x-2 flex place-items-center text-[.8rem]">
                                            <span>
                                                {
                                                    currentReservation?.session_modality === "Virtual"
                                                        ? <Video className="text-(--color-primary)" size={13} />
                                                        : <MapPin className="text-(--color-primary)" size={13} />
                                                }
                                            </span>
                                            <span>{currentReservation?.session_modality}</span>
                                        </p>
                                    </div>
                                </article>
                            </section>

                            <hr />

                            <article>
                                <h3 className="mt-6 opacity-70 text-[.8rem]">ESTADO</h3>
                                <p
                                    className="mt-2 text-(--color-primary-hover) font-bold text-[.7rem] bg-(--color-secondary-transparent) w-fit px-2.5 py-0.5 rounded-full border border-(--color-primary-transparent)">
                                    Confirmada
                                </p>
                            </article>

                        </article>
                    </section>

                </>
            }

        </div>
    );
}