import { create } from 'zustand'
import { Reservation } from '@/schemas/reservations'
import { serverConfig } from "@/lib/serverConfig";
import axios from "axios";

interface setCurrentReservationResponse {
    error: boolean
    data: unknown
}

interface ReservationsStore {
    reservations: Reservation[]
    currentReservation: Reservation | null,
    allReservations: Reservation[]
    getReservations: (params: { client_id: string }) => Promise<Reservation[]>;
    setCurrentReservation: (reservation: Reservation) => setCurrentReservationResponse
    getAllReservations: (params: { professionalId: string }) => Promise<Reservation[]>;
}

export const useReservationsStore = create<ReservationsStore>((set) => ({

    reservations: [],
    currentReservation: null,
    allReservations: [],

    getReservations: async ({ client_id }: { client_id: string }) => {
        const localUrl = serverConfig.reservations.fetchReservationsByUser({ client_id });

        try {
            const response = await axios(localUrl);
            const reservations: Reservation[] = response.data.data;
            const sortReservations = [...reservations].sort(
                (a, b) =>
                    new Date(b.start_time).getTime() -
                    new Date(a.start_time).getTime()
            );
            set({ reservations: sortReservations })
            return sortReservations;
        } catch (error) {
            set({ reservations: [] })
            throw new Error;
        }
    },
    setCurrentReservation: (reservation: Reservation) => {
        try {
            set({ currentReservation: reservation });
            return {
                error: false,
                data: reservation
            }
        } catch (error) {
            return {
                error: true,
                data: error
            }
        }
    },
    getAllReservations: async ({ professionalId }: { professionalId: string }) => {
        const localUrl = serverConfig.reservations.fetchReservationsByProfessional({ professionalId });

        try {
            const response = await axios(localUrl);
            const reservations: Reservation[] = response.data.data;
            const sortReservations = [...reservations].sort(
                (a, b) =>
                    new Date(a.start_time).getTime() -
                    new Date(b.start_time).getTime()
            );
            set({ allReservations: sortReservations })
            return sortReservations;
        } catch (error) {
            set({ reservations: [] })
            throw new Error;
        }
    }

}))
