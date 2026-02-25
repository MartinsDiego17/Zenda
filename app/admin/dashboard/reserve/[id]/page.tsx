import { LayoutDashboardAdmin } from "@/app/core/admin/components/LayoutAdminDashboard";
import { ReserveDetail } from "@/app/core/admin/components/ReserveDetail";

export const metadata = {
    title: "Detalle de reserva",
};


export default function Dashboard() {

    return (
        <LayoutDashboardAdmin routeBack="/admin/dashboard" route="/admin/dashboard/reserve" titleSection="Detalle de reserva">
            <ReserveDetail />
        </LayoutDashboardAdmin>
    );
}