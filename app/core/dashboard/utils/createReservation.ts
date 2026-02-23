import { serverConfig } from "@/lib/serverConfig";
import { NewReservation } from "@/schemas/newReservation";
import axios from "axios";

export const createReservation = async ({ newReservation }: { newReservation: NewReservation }) => {
    const localUrl = serverConfig.reservations.create;

    try {
        const { data } = await axios.post(localUrl, newReservation);
        return data.data.data;
    } catch (error) {
        throw Error;
    }
}