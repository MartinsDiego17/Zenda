"use client";
import { FooterVisitor } from "../core/footer/components/FooterVisitor";
import { HeaderVisitor } from "../core/header/components/HeaderVisitor"
import { LoginForm } from "../core/web-components/LoginForm"
import { useRedirectUser } from "@/lib/redirectUser"

export default function Login() {

    useRedirectUser();

    return (
        <div className="bg-white h-screen flex flex-col justify-between">
            <HeaderVisitor />
            <LoginForm />
            <FooterVisitor />
        </div>
    )
}