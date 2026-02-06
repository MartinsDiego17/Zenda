import { FooterVisitor } from "../core/footer/components/FooterVisitor"
import { HeaderVisitor } from "../core/header/components/HeaderVisitor"
import { RegisterForm } from "../core/web-components/RegisterForm"

export default function Login() {
    return (
        <div className="h-screen flex flex-col justify-between">
            <HeaderVisitor />
            <RegisterForm />
            <FooterVisitor />
        </div>
    )
}