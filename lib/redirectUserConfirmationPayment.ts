"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Reservation } from "@/schemas/reservations";

interface props {
    reservation: Reservation | null
}

export const useRedirectUserConfirmationPayment = ({ reservation }: props) => {

    const router = useRouter();

    useEffect(() => {
        if (!reservation) {
            router.push("/dashboard");
            return;
        }

    }, [reservation]);
};
