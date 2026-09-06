"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { WestminsterConfessionChapter } from "@/data/documentos/confissao-fe-westminster";

export function ConfissaoWestminsterViewer({
  chapters,
}: {
  chapters: WestminsterConfessionChapter[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChapters = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase("pt-BR");

    if (!query) return chapters;

    return chapters
      .map((chapter) => {
        const chapterMatches = `${chapter.number} ${chapter.title}`
          .toLocaleLowerCase("pt-BR")
          .includes(query);

        if (chapterMatches) return chapter;

        const paragraphs = chapter.paragraphs.filter((paragraph) =>
          paragraph.text.toLocaleLowerCase("pt-BR").includes(query)
        );

        return paragraphs.length > 0 ? { ...chapter, paragraphs } : null;
      })
      .filter((chapter): chapter is WestminsterConfessionChapter => Boolean(chapter));
  }, [chapters, searchTerm]);

  const totalParagraphs = chapters.reduce(
    (total, chapter) => total + chapter.paragraphs.length,
    0
  );
  const visibleParagraphs = filteredChapters.reduce(
    (total, chapter) => total + chapter.paragraphs.length,
    0
  );

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por capítulo, tema ou texto da confissão..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="pl-10"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {searchTerm.trim()
            ? `${visibleParagraphs} parágrafo(s) em ${filteredChapters.length} capítulo(s)`
            : `${chapters.length} capítulos · ${totalParagraphs} parágrafos`}
        </p>
      </div>

      <div className="space-y-6">
        {filteredChapters.map((chapter) => (
          <Card key={chapter.number} id={`capitulo-${chapter.number}`} className="scroll-mt-24 shadow-card">
            <CardHeader className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1 shrink-0">
                  Cap. {chapter.number}
                </Badge>
                <CardTitle className="text-xl md:text-2xl">
                  {chapter.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {chapter.paragraphs.map((paragraph) => (
                <article
                  key={paragraph.number}
                  id={`capitulo-${chapter.number}-paragrafo-${paragraph.number}`}
                  className="scroll-mt-24 border-l-2 border-primary/20 pl-4"
                >
                  <p className="leading-7 text-muted-foreground">
                    <span className="mr-2 font-semibold text-foreground">
                      §{paragraph.number}.
                    </span>
                    {paragraph.text}
                  </p>
                </article>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChapters.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            Nenhum capítulo ou parágrafo encontrado para esta busca.
          </CardContent>
        </Card>
      )}
    </section>
  );
}
