import { serverConfig } from "@/lib/serverConfig";
import axios from "axios";

interface props {
    date: Date
    professional_id: string
}

export const getAvailabilityesReservations = async ({ date, professional_id }: props) => {
    if (!date) return;

    const formattedDateTime = `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
        date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
        2,
        "0"
    )}:${String(date.getSeconds()).padStart(2, "0")}`;

    const localUrl = serverConfig.reservations.getAvailability({ date: formattedDateTime, professional_id });

    try {
        const { data } = await axios(localUrl);
        return data.data;
    } catch (error) {
        throw error;
    }
};

/* 2026-02-12 15:30:00 */