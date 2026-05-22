import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Approach } from "@/components/sections/Approach";
import { Hero } from "@/components/sections/Hero";
import { HowIWork } from "@/components/sections/HowIWork";
import { Stats } from "@/components/sections/Stats";
import { TechStack } from "@/components/sections/TechStack";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Contact } from "@/components/sections/Contact";
import { Services } from "@/components/sections/Services";
import { BeyondRoles } from "@/components/sections/BeyondRoles";
import { SECTION_PLACEHOLDERS } from "@/lib/constants";

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Approach />
        <Services />
        <HowIWork />
        <TechStack />
        <CaseStudies />
        <BeyondRoles />
        <Contact />
        <div id={SECTION_PLACEHOLDERS.projects} className="h-0" aria-hidden="true" />
        <div id={SECTION_PLACEHOLDERS.services} className="h-0" aria-hidden="true" />
        <div id={SECTION_PLACEHOLDERS.lab} className="h-0" aria-hidden="true" />
        <div id={SECTION_PLACEHOLDERS.blog} className="h-0" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}

