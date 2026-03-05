import { CalendarAdmin } from "@/app/core/admin/components/calendar/CalendarAdmin";
import { LayoutDashboardAdmin } from "@/app/core/admin/components/LayoutAdminDashboard";

export const metadata = {
    title: "Calendario de reservas",
};


export default function Dashboard() {

    return (
        <LayoutDashboardAdmin
            routeBack="/admin/dashboard"
            route="/admin/dashboard/calendar"
            titleSection="Gestión de agenda"
            subtitleSection="Organizá tu disponibilidad y bloqueá horarios manualmente">
            <CalendarAdmin />
        </LayoutDashboardAdmin>
    );
}