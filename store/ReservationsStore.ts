import { create } from 'zustand'
import { Reservation } from '@/schemas/reservations'
import { serverConfig } from "@/lib/serverConfig";
import axios from "axios";

interface ReservationsStore {
    reservations: Reservation[]
    getReservations: (params: { client_id: string }) => Promise<Reservation[]>;
}

export const useReservationsStore = create<ReservationsStore>((set) => ({

    reservations: [],

    getReservations: async ({ client_id }: { client_id: string }) => {
        const localUrl = serverConfig.reservations.fetchReservationsByUser({ client_id });

        try {
            const response = await axios(localUrl);
            const reservations = response.data.data;
            set({ reservations })
            return reservations;
        } catch (error) {
            set({ reservations: [] })
            throw new Error;
        }
    }
}))
