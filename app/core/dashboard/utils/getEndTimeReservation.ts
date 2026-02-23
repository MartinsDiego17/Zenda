interface Props {
    start_time: string;
    session_duration_minutes: number;
}

export const getEndTimeReservation = ({ start_time, session_duration_minutes }: Props): string => {

    const startDate = new Date(start_time.replace(" ", "T"));
    const endDate = new Date(
        startDate.getTime() + session_duration_minutes * 60000
    );

    const formatDate = (date: Date): string => {
        const pad = (n: number) => n.toString().padStart(2, "0");

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
            date.getDate()
        )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
            date.getSeconds()
        )}`;
    };

    return formatDate(endDate);
};
