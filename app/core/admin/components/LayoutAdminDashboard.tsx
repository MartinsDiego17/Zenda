"use client";
import { ArrowLeft, Menu, X } from "lucide-react";
import { HeaderDashboard } from "../../header/components/HeaderDashboard";
import Link from "next/link";
import "./dashboard-admin.css";
import { AsideDashboardAdmin } from "./AsideDashboardAdmin";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

interface props {
    route?: string
    routeBack?: string
    children: React.ReactNode
    titleSection: string
    subtitleSection?: string
}

export const LayoutDashboardAdmin = ({ children, route, routeBack, titleSection, subtitleSection }: props) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="bg-white dashboard-container w-screen flex flex-col place-items-center justify-between">
            <HeaderDashboard isUserAdmin={true} />

            <div id="toaster-settings" className="absolute">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        classNames: {
                            toast: "bg-white border border-(--color-border) shadow-lg text-(--color-text-primary)",
                            title: "font-semibold text-sm",
                            success: "border-l-4 border-l-(--color-success)",
                            error: "border-l-4 border-l-(--color-error)",
                        }
                    }}
                />
            </div>

            {/* Overlay mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <div className="dashboard-son w-screen">
                <section className="flex justify-between gap-x-8">

                    {/* Aside desktop */}
                    <article className="aside-article h-screen w-[14vw]">
                        <AsideDashboardAdmin />
                    </article>

                    {/* Drawer mobile/tablet */}
                    <div className={`mobile-aside-drawer ${mobileMenuOpen ? "open" : ""}`}>
                        <button
                            className="mobile-aside-close"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X size={20} />
                        </button>
                        <AsideDashboardAdmin />
                    </div>

                    <article className="main-content-article pt-30 w-[86vw] px-[5vw]">

                        {/* Botón hamburguesa — visible solo en mobile/tablet */}
                        <button
                            className="hamburger-btn"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Abrir menú"
                        >
                            <Menu size={22} />
                        </button>

                        {
                            route && route !== "dashboard" && (
                                <div className="w-fit layout-button-back mb-2">
                                    <Link href={routeBack || "/dashboard"}>
                                        <button className="flex place-items-center gap-x-1 text-[.9rem] cursor-pointer text-[#555] hover:gap-x-2">
                                            <span><ArrowLeft strokeWidth={2} size={15} /></span>
                                            <span>Volver</span>
                                        </button>
                                    </Link>
                                </div>
                            )
                        }
                        <div className="mb-8 header-layout">
                            <h1 className="font-extrabold text-3xl">{titleSection}</h1>
                            <h2 className="text-[.9rem] opacity-60">{subtitleSection}</h2>
                        </div>
                        {children}
                    </article>

                </section>
            </div>
        </div>
    );
}