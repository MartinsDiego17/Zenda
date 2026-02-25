import { CalendarAdmin } from "@/app/core/admin/components/CalendarAdmin";
import { LayoutDashboardAdmin } from "@/app/core/admin/components/LayoutAdminDashboard";

export const metadata = {
    title: "Panel de reservas",
};


export default function Dashboard() {

    return (
        <LayoutDashboardAdmin routeBack="/admin/dashboard" route="/admin/dashboard/calendar " titleSection="Gestión de agenda" subtitleSection="Organiza tu disponibilidad y bloquea horarios manualmente">
            <CalendarAdmin />
        </LayoutDashboardAdmin>
    );
}