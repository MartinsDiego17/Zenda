"use client";
import { ArrowLeft } from "lucide-react";
import { HeaderDashboardUser } from "../../header/components/HeaderDashboardUser";
import Link from "next/link";

interface props {
    route?: string
    routeBack?: string
    children: React.ReactNode
    titleSection: string
    subtitleSection: string
}

export const LayoutDashboardUser = ({ children, route, routeBack, titleSection, subtitleSection }: props) => {
    return (
        <div className="bg-white h-screen max-h-screen overflow-hidden w-screen dashboard-container flex place-items-center justify-center">
            <HeaderDashboardUser />

            <div className="dashboard-son w-[70vw]  h-[75vh]">
                {
                    route && route !== "dashboard" && (
                        <div className="w-fit layout-button-back mb-6">
                            <Link  href={routeBack || "/dashboard"}>
                                <button className="flex place-items-center gap-x-1 text-[.9rem] cursor-pointer text-[#555] hover:gap-x-2">
                                    <span><ArrowLeft strokeWidth={2} size={15} /></span>
                                    <span>Volver</span>
                                </button>
                            </Link>
                        </div>
                    )
                }
                <div className="mb-8">
                    <h1 className="font-extrabold text-3xl">{titleSection}</h1>
                    <h2 className="text-[.9rem] opacity-60">{subtitleSection}</h2>
                </div>
                {children}
            </div>
        </div>
    );
}
