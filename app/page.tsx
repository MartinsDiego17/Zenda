import { Choose } from "./core/choose/components/Choose";
import { Cta } from "./core/cta/components/Cta";
import { FooterVisitor } from "./core/footer/components/FooterVisitor";
import { HeaderVisitor } from "./core/header/components/HeaderVisitor";
import { Hero } from "./core/hero/components/Hero";
import { Modalities } from "./core/modalities/components/Modalities";
import { Quiestions } from "./core/questions/components/Questions";

export default function Home() {
  return (
    <>
      <HeaderVisitor />
      <Hero />
      <Choose />
      <Modalities />
      <Quiestions />
      <Cta />
      <FooterVisitor />
    </>
  )
}