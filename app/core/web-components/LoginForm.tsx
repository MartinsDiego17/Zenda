"use client";
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/AuthStore";
import { GoogleIcon } from "./icons/GoogleIcon";

export const LoginForm = () => {

    const loginWithGoogle = useAuthStore(state => state.loginWithGoogle);

    return (
        <div className="login-form-container w-screen h-screen flex justify-center place-items-center pb-70 flex-col">
            <Field className="form-shadcn w-[20vw] py-8 px-6">

                <Button onClick={loginWithGoogle} className="rounded-[10px] flex place-items-center justify-between px-10 font-bold py-6 cursor-pointer bg-(--color-text-primary)">
                    <span>INICIAR SESIÓN CON GOOGLE</span>
                    <span><GoogleIcon /></span>
                </Button>

            </Field>
        </div>
    );
};


