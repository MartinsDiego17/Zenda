import { axiosClient } from "@/lib/axiosClient"
import { serverConfig } from "@/lib/serverConfig"
import { Reservation } from "@/schemas/reservations"

interface props {
    reservation: Reservation
    deposit_amount: number
}

export const getPayment = async ({ reservation, deposit_amount }: props) => {

    const localUrl = serverConfig.reservations.getPayment;

    try {
        const { data } = await axiosClient.post(localUrl, { reservation, deposit_amount });
        return data.data;
    } catch (error) {
        throw error;
    }

}   