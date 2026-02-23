import { LayoutDashboardUser } from "@/app/core/dashboard/components/LayoutDashboardUser"
import { ReservePayment } from "@/app/core/dashboard/components/ReservePayment"

export const metadata = {
    title: 'Zenda: Pasarela de pago',
}

export default function ReservePaymentRoute() {

    return (
        <LayoutDashboardUser
            route="payment"
            routeBack="/dashboard/reserve"
            titleSection="Confirmación y pago"
            subtitleSection="Revisa los detalles de tu turno y realiza el pago de la sena."
        >
            <ReservePayment />
        </LayoutDashboardUser>
    )
}