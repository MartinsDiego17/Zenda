import { axiosClient } from "@/lib/axiosClient";
import { serverConfig } from "@/lib/serverConfig";
import { Reservation } from "@/schemas/reservations";

interface props {
    reservations: Reservation[]
}

export const fecthUsersReservations = async ({ reservations }: props) => {

    const localUrl = serverConfig.reservations.getByUsers;

    try {
        const { data } = await axiosClient.post(localUrl, reservations);
        return data.data;
    } catch (error) {
        throw error;
    }

}