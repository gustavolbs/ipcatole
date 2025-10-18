import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";

export type Notice = {
  _id: string;
  description: string;
  image: string;
  title: string;
  link?: string;
};

export const Notices = ({ notices }: { notices: Notice[] }) => {
  return (
    <section className="animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">Avisos</h2>
      <div className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:overflow-visible">
        {notices.map((notice) => {
          const card = <NoticeCard key={notice._id} notice={notice} />;
          return notice.link ? (
            <a
              key={notice._id}
              href={notice.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 snap-start w-[85%] sm:w-auto"
            >
              {card}
            </a>
          ) : (
            <div
              key={notice._id}
              className="flex-shrink-0 snap-start w-[85%] sm:w-auto"
            >
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const NoticeCard = ({ notice }: { notice: Notice }) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 shadow-card w-full md:w-[240px] lg:w-[300px]">
      <div className="aspect-square bg-muted">
        <Image
          src={notice.image}
          alt={notice.title}
          className="w-full h-full object-cover"
          width={380}
          height={380}
        />
      </div>
      <CardHeader className="py-3 px-5">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary hidden md:block" />
          <p className="text-base line-clamp-1">{notice.title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-5">
        <p
          className="text-muted-foreground line-clamp-3 text-xs md:text-sm"
          title={notice.description}
        >
          {notice.description}
        </p>
      </CardContent>
    </Card>
  );
};
