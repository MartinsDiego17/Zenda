"use client";
import { useRedirectUser } from "@/lib/redirectUser"

export const DashboardAdmin = () => {

    useRedirectUser();

    return (
        <div>
            DashboardAdmin
        </div>
    );
};
