import dayjs from "dayjs";
import { InterfaceEventProps } from "./getCalendarEvents";

export const formatBlockEventForUI =    (event: InterfaceEventProps) => {
  const start = dayjs(event.start);
  const end = dayjs(event.end);

  return {
    start: `${start.format("HH:mm")}hs`,
    end: `${end.format("HH:mm")}hs`,
    date: start.format("dddd D [de] MMMM [de] YYYY")
  };
};