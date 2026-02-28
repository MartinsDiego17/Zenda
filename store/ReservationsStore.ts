"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

import { Reservation } from "@/schemas/reservations";
import { serverConfig } from "@/lib/serverConfig";

interface setCurrentReservationResponse {
    error: boolean;
    data: unknown;
}

interface ReservationsStore {
    reservations: Reservation[];
    currentReservation: Reservation | null;
    allReservations: Reservation[];
    getReservations: (params: { client_id: string }) => Promise<Reservation[]>;
    setCurrentReservation: (reservation: Reservation) => setCurrentReservationResponse;
    getAllReservations: (params: { professionalId: string; }) => Promise<Reservation[]>;
    deleteReservation: (params: { reservationId: string }) => void;
}

export const useReservationsStore = create<ReservationsStore>()(
    persist(
        (set) => ({
            reservations: [],
            currentReservation: null,
            allReservations: [],

            getReservations: async ({ client_id }) => {
                const localUrl =
                    serverConfig.reservations.fetchReservationsByUser({ client_id });

                try {
                    const response = await axios(localUrl);
                    const reservations: Reservation[] = response.data.data;

                    const sortReservations = [...reservations].sort(
                        (a, b) =>
                            new Date(b.start_time).getTime() -
                            new Date(a.start_time).getTime()
                    );

                    set({ reservations: sortReservations });
                    return sortReservations;
                } catch (error) {
                    set({ reservations: [] });
                    throw error;
                }
            },

            setCurrentReservation: (reservation) => {
                try {
                    set({ currentReservation: reservation });
                    return {
                        error: false,
                        data: reservation,
                    };
                } catch (error) {
                    return {
                        error: true,
                        data: error,
                    };
                }
            },

            getAllReservations: async ({ professionalId }) => {
                const localUrl =
                    serverConfig.reservations.fetchReservationsByProfessional({
                        professionalId,
                    });

                try {
                    const response = await axios(localUrl);
                    const reservations: Reservation[] = response.data.data;

                    const sortReservations = [...reservations].sort(
                        (a, b) =>
                            new Date(a.start_time).getTime() -
                            new Date(b.start_time).getTime()
                    );

                    set({ allReservations: sortReservations });
                    return sortReservations;
                } catch (error) {
                    set({ allReservations: [] });
                    throw error;
                }
            },

            deleteReservation: async ({ reservationId }) => {
                const localUrl = `${serverConfig.reservations.common}/${reservationId}`;

                try {
                    await axios.delete(localUrl);
                } catch (error) {
                    return error;
                }
            },
        }),
        {
            name: "reservations-store",
            partialize: (state) => ({
                reservations: state.reservations,
                currentReservation: state.currentReservation,
                allReservations: state.allReservations,
            }),
        }
    )
);