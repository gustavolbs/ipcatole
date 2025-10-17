"use client";

import { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { WeeklyQuestion } from "./_components/WeeklyQuestion";
import { Devotional } from "./_components/Devotional";
import { FeaturedVideos } from "./_components/FeaturedVideos";
import { Notices } from "./_components/Notices";
import { GalleryFeed } from "./_components/GalleryFeed";
import { CampaignBanner } from "./_components/CampaignBanner";
import { Calendar } from "./_components/Calendar";

// ✅ Array de seções com seus componentes
const sections = [
  { id: "campanhas", label: "Campanhas", Component: CampaignBanner },
  { id: "videos", label: "Vídeos em Destaque", Component: FeaturedVideos },
  { id: "avisos", label: "Avisos", Component: Notices },
  { id: "galeria", label: "Galeria", Component: GalleryFeed },
  { id: "pergunta", label: "Pergunta Semanal", Component: WeeklyQuestion },
  { id: "devocional", label: "Devocional", Component: Devotional },
  { id: "eventos", label: "Eventos", Component: Calendar },
] as const;

// ✅ Tipagem segura para os ids
type SectionId = (typeof sections)[number]["id"];

export default function Midia() {
  const [activeSection, setActiveSection] = useState<SectionId>(sections[0].id);
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>(
    {} as Record<SectionId, HTMLElement | null>
  );

  // 🔹 Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;

      let currentSection: SectionId = sections[0].id;

      // percorre as seções de cima para baixo, atualizando a mais próxima
      for (const { id } of sections) {
        const el = sectionRefs.current[id];
        if (el && el.offsetTop <= scrollY) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // inicializa com a seção correta
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Scroll suave para uma seção
  const scrollToSection = (id: SectionId) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* 🧭 MENU LATERAL FIXO (desktop) */}
      <nav className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col space-y-4 z-40">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`transition-all duration-300 font-semibold text-left rounded-lg px-4 py-2 ${
              activeSection === id
                ? "text-primary text-lg scale-110 bg-primary/10 shadow-sm"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* 📱 MENU HORIZONTAL FIXO (mobile) */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-background/80 backdrop-blur-md border-b border-border flex lg:hidden overflow-x-auto whitespace-nowrap scrollbar-hidden">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`px-4 py-3 font-medium transition-all ${
              activeSection === id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 🧱 CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto px-4 py-8 max-w-4xl lg:pl-48 pt-16 lg:pt-8 space-y-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Gestão de Mídia
          </h2>
          <p className="text-muted-foreground">
            Gerencie campanhas e vídeos em destaque do site
          </p>
        </div>

        {sections.map(({ id, Component }, idx) => (
          <div
            key={id}
            ref={(el) => {
              sectionRefs.current[id] = el;
            }}
          >
            <Component />
            {idx < sections.length - 1 && <Separator className="my-8" />}
          </div>
        ))}
      </div>
    </div>
  );
}
