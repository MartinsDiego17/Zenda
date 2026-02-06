import type { Metadata } from "next";
import "./globals.css";

import '@fontsource-variable/inter';
import '@fontsource/poppins';


export const metadata: Metadata = {
  title: "Zenda: Agenda sesiones con tu psicólogo",
  description: "Zenda es una plataforma web destinada a la gestión de reservas y turnos con profesionales de la salud mental.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
