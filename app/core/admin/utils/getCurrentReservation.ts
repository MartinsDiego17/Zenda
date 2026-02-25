import { serverConfig } from "@/lib/serverConfig"
import axios from "axios";

export const getCurrentReservation = async ({ reservationId } : { reservationId: string }) => {
    const localUrl = serverConfig.reservations.findOne({ reservationId });

    try {
        const { data } = await axios(localUrl);
        return data.data[0];
    } catch (error) {
        throw error;
    }
}