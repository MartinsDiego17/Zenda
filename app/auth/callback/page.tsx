"use client";

import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Spinner } from "@/components/ui/spinner"

export default function AuthCallback() {

    const router = useRouter()

    const currentSession = useAuthStore(state => state.session);

    useEffect(() => {
        const current_path = window.origin;
        if (currentSession) {
            router.push(`${current_path}/dashboard`)
        }
    }, [currentSession]);

    return (
        <div className="h-screen w-screen flex place-items-center justify-center">
            <Spinner className="size-20" color="var(--color-primary)" />
        </div>
    )
}