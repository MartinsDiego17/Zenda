
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const LoginForm = () => {
    return (
        <div className="login-form-container w-screen h-screen flex justify-center place-items-center pb-70 flex-col">
            <Field className="form-shadcn w-[20vw] py-8 px-6">

                <FieldLabel htmlFor="name">Nombre y apellido</FieldLabel>
                <Input className="py-5 border-[#aaa]" id="name" type="text" placeholder="John Doe" />

                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input className="py-5 border-[#aaa]" id="email" type="text" placeholder="johndoe@hotmail.com" />

                <div className="flex mt-5 gap-x-3 place-items-center">
                    <Checkbox className="border-[#888]" id="save-login-data" name="save-login-data" />
                    <FieldLabel htmlFor="save-login-data">
                        Mantener sesión iniciada
                    </FieldLabel>
                </div>
                <Button className="rounded-full py-6 mt-5 cursor-pointer bg-(--color-text-primary)">
                    Iniciar sesión
                </Button>
            </Field>
            <p className="mt-4 text-[.8rem] flex place-items-center gap-x-2">
                <span className="opacity-80">¿Todavía no tienes cuenta?</span>
                <span>
                    <Link href={"/register"}>
                        Regístrate
                    </Link>
                </span>
            </p>
        </div>
    );
};


