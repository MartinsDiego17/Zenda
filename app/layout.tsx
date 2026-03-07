import type { Metadata } from "next";
import "./globals.css";

import '@fontsource-variable/inter';
import '@fontsource/poppins';
import { AuthProvider } from "./providers/AuthProvider";


export const metadata: Metadata = {
  title: {
    default: "Zenda: Agenda sesiones con tu psicólogo",
    template: "%s | Zenda",
  },
  description:
    "Gestiona tus reservas y turnos con profesionales de la salud mental de forma fácil y segura.",
  keywords: [
    "psicólogo online",
    "salud mental",
    "agenda psicólogo",
    "reserva sesión psicológica",
    "turnos psicólogo",
    "terapia online",
    "bienestar mental",
  ],
  authors: [{ name: "Diego Martins" }],
  creator: "Zenda",
  metadataBase: new URL("https://zenda-i3jv.vercel.app/"), // 👈 reemplaza con tu dominio real

  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://zenda-i3jv.vercel.app/",
    siteName: "Zenda",
    title: "Zenda: Agenda sesiones con tu psicólogo",
    description:
      "Gestiona tus reservas y turnos con profesionales de la salud mental de forma fácil y segura.",
    images: [
      {
        url: "/og-image.png", // 👈 agrega una imagen 1200x630px en /public
        width: 1200,
        height: 630,
        alt: "Zenda - Plataforma de salud mental",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Zenda: Agenda sesiones con tu psicólogo",
    description:
      "Gestiona tus reservas y turnos con profesionales de la salud mental de forma fácil y segura.",
    images: ["/og-image.png"],
    // creator: "@zenda", // 👈 descomenta si tienes Twitter/X
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
