import { LayoutDashboardUser } from "@/app/core/dashboard/components/LayoutDashboardUser"
import { ReserveUser } from "@/app/core/dashboard/components/ReserveUser"

export const metadata = {
    title: 'Zenda: Reserva de sesión',
}

export default function Reserve() {

    return (
        <LayoutDashboardUser
            titleSection="Seleccioná fecha y horario"
            subtitleSection="Elegí el día, horario y modalidad para tu sesión"
            route="reserve"
            routeBack="/dashboard"
        >
            <ReserveUser />
        </LayoutDashboardUser>
    )
}