"use client"

import { Choose } from "./core/choose/components/Choose"
import { Cta } from "./core/cta/components/Cta"
import { FooterVisitor } from "./core/footer/components/FooterVisitor"
import { HeaderVisitor } from "./core/header/components/HeaderVisitor"
import { Hero } from "./core/hero/components/Hero"
import { Modalities } from "./core/modalities/components/Modalities"
import { Questions } from "./core/questions/components/Questions"
import { useRedirectUser } from "@/lib/redirectUser"

export default function Home() {

  useRedirectUser();

  return (
    <>
      <HeaderVisitor />
      <Hero />
      <Choose />
      <Modalities />
      <Questions />
      <Cta />
      <FooterVisitor />
    </>
  )
}
