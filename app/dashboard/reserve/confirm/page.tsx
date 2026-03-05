import { ReserveConfirm } from "@/app/core/dashboard/components/confirm/ReserveConfirm"
import { LayoutDashboardUser } from "@/app/core/dashboard/components/LayoutDashboardUser"

export const metadata = {
    title: 'Zenda: Reserva confirmada',
}

export default function ReserveConfirmRoute() {

    return (
        <LayoutDashboardUser route="confirm" routeBack="/dashboard">
                <ReserveConfirm />
        </LayoutDashboardUser>
    )
}