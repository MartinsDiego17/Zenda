"use client";
import { FooterCommon } from "../core/footer/components/FooterCommon";
import { HeaderVisitor } from "../core/header/components/HeaderVisitor"
import { LoginForm } from "../core/web-components/LoginForm"
import { useRedirectUser } from "@/lib/redirectUser"

export default function Login() {

    useRedirectUser();

    return (
        <div className="h-screen flex flex-col justify-between">
            <HeaderVisitor />
            <LoginForm />
            <FooterCommon />
        </div>
    )
}