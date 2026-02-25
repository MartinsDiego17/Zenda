import { serverConfig } from "@/lib/serverConfig";
import { Reservation } from "@/schemas/reservations";
import axios from "axios";

export interface AdminBlock {
    start: string
    end: string
}

export const getAdminBlocks = async ({ professionalId }: { professionalId: string }) => {

    const adminBlocks: AdminBlock[] = [];
    const localUrl = serverConfig.reservations.fetchReservationsByProfessional({ professionalId });

    try {
        const { data } = await axios(localUrl);
        const reservations = data.data;
        reservations.forEach((res: Reservation) => {
            if (res.client_id === professionalId) {
                adminBlocks.push({
                    start: res.start_time,
                    end: res.end_time
                })
            }
        })
    } catch (error) {
        throw error;
    }

    return adminBlocks;

}