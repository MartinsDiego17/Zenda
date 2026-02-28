interface props {
    start: string
    end: string
}

interface response {
    date: string
    schedule: string
}

export const getInfoDate = ({ start, end }: props): response => {
    const startDate = new Date(start);

    const date = startDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }).replace(/^\w/, (c) => c.toUpperCase()); 

    const schedule = startDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }); // "09:55"

    return { date, schedule };
}