import { LayoutDashboardAdmin } from "@/app/core/admin/components/LayoutAdminDashboard";
import { HistoryReservations } from "@/app/core/admin/components/reservations/HistoryReservations";

export const metadata = {
    title: "Historial de reservas"
};


export default function Dashboard() {

    return (
        <LayoutDashboardAdmin
            routeBack="/admin/dashboard"
            route="/admin/dashboard/reservation-history"
            titleSection="Historial de reservas"
            subtitleSection="Acá vas a poder acceder al listado de reservas">
            <HistoryReservations />
        </LayoutDashboardAdmin>
    );
}