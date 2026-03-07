"use client";
import { ArrowLeft } from "lucide-react";
import { HeaderDashboard } from "../../header/components/HeaderDashboard";
import Link from "next/link";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect, useState } from "react";
import { Profile } from "@/schemas/profile";
import { ModalCompleteProfile } from "./ModalCompleteProfile";

interface props {
    route?: string
    routeBack?: string
    children: React.ReactNode
    titleSection?: string
    subtitleSection?: string
}

export const LayoutDashboardUser = ({ children, route, routeBack, titleSection, subtitleSection }: props) => {

    const currentSession = useAuthStore(state => state.session);
    const currentUser = useAuthStore(state => state.user);
    const currentFindOneUser = useAuthStore(state => state.findOneUser);
    const updateProfile = useAuthStore(state => state.updateProfile);
    const [localProfile, setLocalProfile] = useState<Profile>();

    useEffect(() => {
        if (currentSession && !currentUser) {
            currentFindOneUser({ userId: currentSession.user.id });
        }
    }, [currentSession]);

    useEffect(() => {
        if (currentUser) setLocalProfile(currentUser);
    }, [currentUser]);

    const handleSubmitUserData = async ({ profile }: { profile: Profile | undefined }) => {
        if (!profile || !currentSession) return;
        try {
            await updateProfile({ userId: currentSession.user.id, profile });
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        }
    }

    return (
        <div className="bg-white dashboard-container flex place-items-center justify-center">
            <HeaderDashboard />

            <div className="dashboard-son w-[70vw] h-[75vh]">
                {
                    route && route !== "dashboard" && (
                        <div className="w-fit layout-button-back mb-6">
                            <Link href={routeBack || "/dashboard"}>
                                <button className="flex place-items-center gap-x-1 text-[.9rem] cursor-pointer text-[#555] hover:gap-x-2">
                                    <span><ArrowLeft strokeWidth={2} size={15} /></span>
                                    <span>Volver</span>
                                </button>
                            </Link>
                        </div>
                    )
                }
                <div className="mb-8 layout-user-titles">
                    <h1 className="font-extrabold text-3xl">{titleSection}</h1>
                    <h2 className="text-[.9rem] opacity-60">{subtitleSection}</h2>
                    {
                        !currentUser?.is_profile_complete && (
                            <ModalCompleteProfile
                                profile={localProfile}
                                setLocalProfile={setLocalProfile}
                                handleSubmitUserData={handleSubmitUserData}
                            />
                        )
                    }
                </div>
                {children}
            </div>
        </div>
    );
}