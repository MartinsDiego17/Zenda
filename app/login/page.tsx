import { FooterVisitor } from "../core/footer/components/FooterVisitor"
import { HeaderVisitor } from "../core/header/components/HeaderVisitor"
import { LoginForm } from "../core/web-components/LoginForm"


export default function Login() {
    return (
        <div className="h-screen flex flex-col justify-between">
            <HeaderVisitor />
            <LoginForm />
            <FooterVisitor />
        </div>
    )
}