
const enviroment = process.env;
const serverUrl = enviroment.NEXT_PUBLIC_SERVER_URL;

export const serverConfig = {
    reservations: {
        common: `${serverUrl}/reservations`,
        fetchReservationsByUser: ({ client_id }: { client_id: string }) => { return `${serverUrl}/reservations/user/${client_id}` },
        getAvailability: ({ date, professional_id, }: { date: string | undefined; professional_id: string; }) => {
            return `${serverUrl}/reservations/availability?date=${date}&professional_id=${professional_id}`;
        },
        getPayment: `${serverUrl}/reservations/payment`,
        create: `${serverUrl}/reservations/create-without-payment`

    },
    professionalSettings: {
        get: `${serverUrl}/professional-settings`
    },
    profile: {
        findOne: ({ adminUserId }: { adminUserId: string }) => { return `${serverUrl}/profiles/${adminUserId}` }
    }
}