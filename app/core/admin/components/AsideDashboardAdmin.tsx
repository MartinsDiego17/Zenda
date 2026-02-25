"use client"

import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    CalendarDays,
    ClipboardList,
    Users,
    Settings,
} from "lucide-react"
import Link from "next/link"

const NAV_ITEMS = [
    {
        label: "Dashboard",
        section: true,
        items: [
            { label: "Inicio", href: "/admin/dashboard", icon: LayoutDashboard },
            { label: "Agenda", href: "/admin/dashboard/calendar", icon: CalendarDays },
            { label: "Reservas", href: "/admin/dashboard/reservation-history", icon: ClipboardList },
            { label: "Clientes", href: "/admin/dashboard/users", icon: Users },
            { label: "Configuracion", href: "/admin/dashboard/professional-settings", icon: Settings },
        ],
    },
]

export const AsideDashboardAdmin = () => {
    const pathname = usePathname()

    return (
        <aside className="hidden h-screen w-full shrink-0 lg:block">
            <nav
                className="sticky flex flex-col h-screen gap-1 bg-card aside-admin-dashboard"
                aria-label="Admin navigation"
            >
                {NAV_ITEMS.map((group) => (
                    <div key={group.label} className="flex flex-col gap-0.5">
                        <span
                            className="px-3 pt-2 pb-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {group.label}
                        </span>
                        {group.items.map((item) => {
                            const active = (pathname === item.href) || (item.label === "Reservas" && pathname.includes("/reserve"));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${active
                                            ? "text-(--color-primary) cursor-auto bg-(--color-terciary-transparent)"
                                            : "text-foreground/70 hover:bg-(--color-primary-transparent) hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className={`size-4.5 ${active ? "text-(--color-primary)" : "text-muted-foreground"}`} />
                                    {item.label}
                                    {active && (
                                        <span className="ml-auto size-1.5 rounded-full bg-(--color-primary)" />
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                ))}
            </nav>
        </aside>
    )
}
