const DAY_MAP: Record<string, string> = {
    MON: "Lunes",
    TUE: "Martes",
    WED: "Miércoles",
    THU: "Jueves",
    FRI: "Viernes",
    SAT: "Sábado",
    SUN: "Domingo",
};

const DAY_ORDER = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const getCodedToUi = (workDays: string): string[] => {
    const [start, end] = workDays.split("-");
    const startIndex = DAY_ORDER.indexOf(start);
    const endIndex = DAY_ORDER.indexOf(end);

    return DAY_ORDER.slice(startIndex, endIndex + 1).map((day) => DAY_MAP[day]);
};