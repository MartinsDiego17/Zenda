import { axiosClient } from "@/lib/axiosClient";
import { serverConfig } from "@/lib/serverConfig";
import { NewReservation } from "@/schemas/newReservation";
export const createReservation = async ({ newReservation }: { newReservation: NewReservation }) => {
    const localUrl = serverConfig.reservations.create;

    try {
        const { data } = await axiosClient.post(localUrl, newReservation);
        return data.data.data;
    } catch (error) {
        throw Error;
    }
}