import { CalendarDays, ClipboardList, Settings, Users } from "lucide-react";

export const QUICK_LINKS = [
  {
    label: "Gestión de agenda",
    href: "/admin/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    label: "Reservas",
    href: "/admin/dashboard/reservation-history",
    icon: ClipboardList,
  },
  {
    label: "Configuración profesional",
    href: "/admin/dashboard/professional-settings",
    icon: Settings,
  },
  {
    label: "Clientes",
    href: "/admin/dashboard/users",
    icon: Users,
  },
]