import { LayoutDashboardUser } from "@/app/core/dashboard/components/LayoutDashboardUser"
import { ReserveConfirm } from "@/app/core/dashboard/components/ReserveConfirm"

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