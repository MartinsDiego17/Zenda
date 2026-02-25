"use client";
import { ArrowLeft } from "lucide-react";
import { HeaderDashboard } from "../../header/components/HeaderDashboard";
import Link from "next/link";
import "./dashboard-admin.css";
import { AsideDashboardAdmin } from "./AsideDashboardAdmin";
import { FooterVisitor } from "../../footer/components/FooterVisitor";

interface props {
    route?: string
    routeBack?: string
    children: React.ReactNode
    titleSection: string
    subtitleSection?: string
}

export const LayoutDashboardAdmin = ({ children, route, routeBack, titleSection, subtitleSection }: props) => {
    return (
        <div className="bg-white h-screen max-h-screen overflow-hidden w-screen dashboard-container flex flex-col place-items-center justify-between">
            <HeaderDashboard isUserAdmin={true} />

            <div className="dashboard-son w-screen  h-[75vh]">
                <section className="flex justify-between gap-x-8">

                    <article className="h-screen w-[14vw]">
                        <AsideDashboardAdmin />
                    </article>

                    <article className="pt-30 w-[86vw] px-[5vw] h-[60vh]">
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
                        <div className="mb-8">
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
