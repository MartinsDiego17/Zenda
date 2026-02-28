export interface ResponseUsersReservations {
    id: string;
    fullname: string;
    email: string; // agregar si no está
    date: string;
    schedule: string;
    modality: string;
    status: string;
    itPast: boolean;
}