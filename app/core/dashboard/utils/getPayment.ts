import { serverConfig } from "@/lib/serverConfig"
import { Reservation } from "@/schemas/reservations"
import axios from "axios"

interface props {
    reservation: Reservation
    deposit_amount: number
}

export const getPayment = async ({ reservation, deposit_amount } : props) => {

    const localUrl = serverConfig.reservations.getPayment;

    try {
        const { data }= await axios.post(localUrl, { reservation, deposit_amount });
        return data.data;
    } catch (error) {
        throw error;
    }

}   