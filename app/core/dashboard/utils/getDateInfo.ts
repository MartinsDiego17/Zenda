interface Props {
  start_time: string;
  end_time: string;
}

export const getDateInfo = ({ start_time, end_time }: Props) => {
  const startDate = new Date(start_time);
  const endDate = new Date(end_time);

  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const day = startDate.getDate();
  const month = months[startDate.getMonth()];
  const year = startDate.getFullYear();

  const pad = (num: number) => num.toString().padStart(2, "0");

  const startHours = pad(startDate.getHours());
  const startMinutes = pad(startDate.getMinutes());

  const endHours = pad(endDate.getHours());
  const endMinutes = pad(endDate.getMinutes());

  return {
    date: `${day} de ${month} del ${year}`,
    schedule: `${startHours}:${startMinutes}hs - ${endHours}:${endMinutes}hs`,
  };
};
