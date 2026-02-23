"use client";

import { useReservationsStore } from "@/store/ReservationsStore";
import { ButtonSecondary } from "../../web-components/ButtonSecondary";
import { ButtonPrimary } from "../../web-components/ButtonPrimary";
import { Calendar, Clock, CreditCard, Video, CircleAlert, User, MapPin } from "lucide-react";
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormattedReservationProps, getFormattedDataCurrentReservation } from "../utils/getFormattedDataCurrentReservation";
import { useProfessionalSettingsStore } from "@/store/ProfessionalSettingsStore";
import { useAuthStore } from "@/store/AuthStore";
import { Profile } from "@/schemas/profile";
import { formattedAmountDeposit } from "../utils/getFormattedAmountDeposit";
import { useRedirectUserConfirmationPayment } from "@/lib/redirectUserConfirmationPayment";
import { getPayment } from "../utils/getPayment";

export const ReservePayment = () => {

    const currentProfessionalSettings = useProfessionalSettingsStore(state => state.professional_settings);
    const currentReservation = useReservationsStore(state => state.currentReservation);
    const currentGetAdminUser = useAuthStore(state => state.getAdminUser);
    const [localCurrentUserAdmin, setLocalCurrentUserAdmin] = useState<Profile | null>();

    useRedirectUserConfirmationPayment({ reservation: currentReservation });

    useEffect(() => {
        if (currentProfessionalSettings) {
            const fetchUserAdmin = async () => {
                const data = await currentGetAdminUser({ adminUserId: currentProfessionalSettings.user_id });
                setLocalCurrentUserAdmin(data);
            }

            fetchUserAdmin();

        }
    }, [currentProfessionalSettings, currentGetAdminUser, currentReservation]);

    const localReservation: FormattedReservationProps | null = getFormattedDataCurrentReservation(currentReservation)

    const handlePayment = async () => {
        if (!currentReservation) return;
        const preferenceInitPoint = await getPayment({ reservation: currentReservation, deposit_amount: currentProfessionalSettings?.deposit_amount || 10000 });
        if (preferenceInitPoint) window.location.href = preferenceInitPoint;
    }

    return (
        <div className="payment-container w-full h-full flex flex-col place-items-center">
            <section className="h-[80%] pb-10 w-full flex justify-between gap-x-10">

                {
                    currentReservation
                        ? (
                            <>
                                <article className="card-payment-container h-full w-full">
                                    <h3 className="font-bold">Resumen del turno</h3>
                                    <ul className="text-[.8rem] mt-5 opacity-80  flex flex-col gap-y-3.5">
                                        <li>
                                            <div className="font-bold">
                                                <span><Calendar size={15} /></span>
                                                <span>Fecha</span>
                                            </div>
                                            <span>{localReservation?.formattedDate}</span>
                                        </li>

                                        <li>
                                            <div className="font-bold">
                                                <span><Clock size={15} /></span>
                                                <span>Horario</span>
                                            </div>
                                            <span>{localReservation?.formattedSchedule}</span>
                                        </li>

                                        <li>
                                            <div className="font-bold">
                                                <span><Video size={15} /></span>
                                                <span>Modalidad</span>
                                            </div>
                                            <span>{localReservation?.formattedSessionModality}</span>
                                        </li>


                                        <li>
                                            <div className="font-bold">
                                                <span><User size={15} /></span>
                                                <span>Licenciada/o</span>
                                            </div>
                                            <span>{localCurrentUserAdmin?.full_name}</span>
                                        </li>

                                        {
                                            currentReservation.session_modality === "Presencial" && (
                                                <li>
                                                    <div className="font-bold">
                                                        <span><MapPin size={15} /></span>
                                                        <span>Ubicación</span>
                                                    </div>
                                                    <span>{currentProfessionalSettings?.office_address}</span>
                                                </li>
                                            )
                                        }
                                    </ul>

                                    <div className="status-pay-container mt-7 p-6">
                                        <h3 className="flex place-items-center gap-x-2">
                                            <span className="text-[#ff9900]"><CircleAlert strokeWidth={2} size={20} /></span>
                                            <span>Estado del turno: </span>
                                            <span className="font-bold">Pendiente de pago</span>
                                        </h3>
                                        <p className="text-[.8rem] mt-3 opacity-70">El turno se confirmará una vez acreditado el pago.</p>
                                    </div>

                                    <p className="text-[.7rem] text-pretty mt-3 opacity-70">Las solicitudes de cancelación o reprogramación deberán realizarse con una antelación mínima de 48 horas.</p>

                                </article>

                                <article className="card-payment-container h-full w-full">
                                    <h3 className="font-bold">Pago de seña</h3>
                                    <h4 className="mt-4 opacity-80 text-[.9rem] flex place-items-center gap-x-1">
                                        Para confirmar el turno se requiere una seña de
                                        <span className="font-bold">
                                            ${formattedAmountDeposit({ deposit_amount: currentProfessionalSettings?.deposit_amount || 12000 })}
                                        </span>
                                    </h4>
                                    <div className="flex-col p-6 mercado-pago-box-container mt-10 flex justify-center place-items-center">
                                        <h2 className="font-extrabold flex text-4xl">
                                            <span className="text-xl">$</span>
                                            <span>{formattedAmountDeposit({ deposit_amount: currentProfessionalSettings?.deposit_amount || 12000 })}</span>
                                        </h2>
                                        <p className="chip font-bold text-[.7rem] opacity-80 mb-6">Seña requerida</p>
                                        <ButtonPrimary handler={handlePayment}>
                                            <span><CreditCard /></span>
                                            <span>Pagar con Mercado Pago</span>
                                        </ButtonPrimary>
                                    </div>
                                </article>
                            </>
                        )
                        : (
                            <div className="w-full h-full flex justify-center place-items-center">
                                <Spinner className="size-20" color="var(--color-primary)" />
                            </div>
                        )
                }

            </section>
            <div className="flex w-full justify-center place-items-center gap-x-5">
                <Link href={"/dashboard/reserve"}>
                    <ButtonSecondary>
                        <span>Volver y modificar</span>
                    </ButtonSecondary>
                </Link>
                <ButtonPrimary handler={handlePayment}>
                    <span><CreditCard /></span>
                    <span>Confirmar pago</span>
                </ButtonPrimary>
            </div>
        </div>
    );
};
