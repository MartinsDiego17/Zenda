const DAY_MAP: Record<string, string> = {
    "Lunes": "MON",
    "Martes": "TUE",
    "Miércoles": "WED",
    "Jueves": "THU",
    "Viernes": "FRI",
    "Sábado": "SAT",
    "Domingo": "SUN",
};

export const getUIToCoded = (workDays: string[]): string => {
    const coded = workDays.map((day) => DAY_MAP[day]);
    return `${coded[0]}-${coded[coded.length - 1]}`;
};