import { LayoutDashboardAdmin } from "@/app/core/admin/components/LayoutAdminDashboard";
import { ProfessionalSettings } from "@/app/core/admin/components/professional-settings/ProfessionalSettings";

export const metadata = {
    title: "Configuración profesional"
};


export default function Dashboard() {

    return (
        <LayoutDashboardAdmin
            routeBack="/admin/dashboard"
            route="/admin/dashboard/professional-settings"
            titleSection="Configuración profesional"
            subtitleSection="Define como configurar tus sesiones">
                <ProfessionalSettings />
        </LayoutDashboardAdmin>
    );
}