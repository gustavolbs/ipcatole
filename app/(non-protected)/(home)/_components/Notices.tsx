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
    <section>
      <h2 className="text-3xl font-bold mb-6">Avisos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {notices.map((notice) => {
          if (notice.link) {
            return (
              <a
                key={notice._id}
                href={notice.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <NoticeCard notice={notice} />
              </a>
            );
          }

          return <NoticeCard key={notice._id} notice={notice} />;
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
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          {notice.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className="text-muted-foreground line-clamp-3"
          title={notice.description}
        >
          {notice.description}
        </p>
      </CardContent>
    </Card>
  );
};
