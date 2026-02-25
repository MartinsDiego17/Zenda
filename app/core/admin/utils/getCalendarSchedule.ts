import { serverConfig } from "@/lib/serverConfig";
import axios from "axios";

export interface PropsCalendarSchedule {
  min: Date | null;
  max: Date | null;
}

const timeStringToDate = (time: string): Date => {
  const today = new Date().toISOString().split("T")[0];
  return new Date(`${today}T${time}`);
};

export const getCalendarSchedule = async (): Promise<PropsCalendarSchedule> => {
  const localUrl = serverConfig.professionalSettings.get;

  try {
    const { data } = await axios(localUrl);
    const settings = data.data[0];

    const { work_start_time, work_end_time } = settings;

    return {
      min: timeStringToDate(work_start_time),
      max: timeStringToDate(work_end_time),
    };
  } catch (error) {
    throw error;
  }
};