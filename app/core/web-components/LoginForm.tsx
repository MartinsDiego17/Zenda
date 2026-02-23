"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store/AuthStore"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
        fill="#EA4335"
      />
    </svg>
  )
}

export const LoginForm = () => {

  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const loginWithGoogle = useAuthStore(state => state.loginWithGoogle);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex pt-10 flex-col">

      <main className="relative flex flex-1 items-center justify-center px-6 pt-24 pb-16">

        <div
          ref={cardRef}
          className={`relative w-full max-w-md transition-all duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <Card className="border-border/60 bg-card/80 shadow-lg backdrop-blur-sm">
            <CardContent className="flex flex-col items-center gap-8 px-8 py-10 sm:px-12 sm:py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-(--color-primary) shadow-md">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <h1
                    className="text-2xl font-bold tracking-tight text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Bienvenido a Zenda
                  </h1>
                  <p className="text-center text-sm leading-relaxed text-muted-foreground">
                    Inicia sesión para gestionar tus citas y acceder a tus sesiones
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex w-full items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Continuar con
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Google sign-in button */}
              <button onClick={loginWithGoogle}
                type="button"
                className="cursor-pointer group relative flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-(--color-primary-transparent) hover:bg-accent hover:shadow-md active:scale-[0.98]"
              >
                <span className="absolute inset-0 rounded-xl bg-primary/0 transition-colors duration-200 group-hover:bg-(--color-terciary-transparent)" />
                <GoogleIcon className="relative size-5" />
                <span className="relative">Iniciar sesión con Google</span>
              </button>

              {/* Terms */}
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Al iniciar sesión, acepta nuestros{" "}
                <a
                  href="#"
                  className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  Términos de servicio
                </a>{" "}
                y{" "}
                <a
                  href="#"
                  className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  Política de privacidad
                </a>
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>

    </div>
  )
}