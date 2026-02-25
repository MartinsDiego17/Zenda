import Link from "next/link";
import { Logo } from "../../web-components/Logo";

export const FooterVisitor = () => {
  return (
    <footer className="w-screen border-t bg-card">
      <div className="mx-auto flex max-w-[70vw] flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          {`\u00A9 ${new Date().getFullYear()} Zenda. Desarrollado por`}
          <Link target="_blank" href={"https://www.linkedin.com/in/diego-martins-563954278/"}>
            <span className="font-bold"> Diego Martins</span>.
          </Link>
        </p>
      </div>
    </footer>
  )
}
