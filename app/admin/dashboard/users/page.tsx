import { LayoutDashboardAdmin } from "@/app/core/admin/components/LayoutAdminDashboard";
import { ListUsersAndSessions } from "@/app/core/admin/components/users/ListUsersAndSessions";

export const metadata = {
    title: "Listado de usuarios"
};


export default function Dashboard() {

    return (
        <LayoutDashboardAdmin
            routeBack="/admin/dashboard"
            route="/admin/dashboard/users"
            titleSection="Gestión de clientes"
            subtitleSection="Gestión y seguimiento de tus pacientes">
            <ListUsersAndSessions />
        </LayoutDashboardAdmin>
    );
}