import { serverConfig } from "@/lib/serverConfig";
import { Reservation } from "@/schemas/reservations";
import axios from "axios";

interface props {
    reservations: Reservation[]
}

export const fecthUsersReservations = async ({ reservations }: props) => {

    const localUrl = serverConfig.reservations.getByUsers;

    try {
        const { data } = await axios.post(localUrl, reservations);
        return data.data;
    } catch (error) {
        throw error;
    }

}