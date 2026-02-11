
const enviroment = process.env;
const serverUrl = enviroment.NEXT_PUBLIC_SERVER_URL;

export const serverConfig = {
    reservations: {
        common: `${serverUrl}/reservations`,
        fetchReservationsByUser: ({ client_id }: { client_id: string }) => { return `${serverUrl}/reservations/user/${client_id}` }
    }
}