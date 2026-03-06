import { axiosClient } from "@/lib/axiosClient";
import { serverConfig } from "@/lib/serverConfig"

export const getCurrentReservation = async ({ reservationId } : { reservationId: string }) => {
    const localUrl = serverConfig.reservations.findOne({ reservationId });

    try {
        const { data } = await axiosClient(localUrl);
        return data.data[0];
    } catch (error) {
        throw error;
    }
}