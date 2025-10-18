import { getYouTubeEmbedUrl } from "@/lib/youtube";
import {
  getFeaturedVideos,
  getWeeklyQuestion,
  getDevotional,
  getGalleryFeed,
  getNotices,
  getCalendarEvents,
  getAniversariantesSemana,
} from "@/app/api";
import {
  Live,
  FeaturedVideos,
  Notices,
  GalleryFeed,
  WeeklyQuestion,
  Devotional,
  Birthdays,
  Suggestions,
  Calendar,
} from "./_components";
import { Metadata } from "next";
import { PrayerRequests } from "./_components/PrayerRequests";

export const metadata: Metadata = {
  title: "Página Inicial",
};

const Home = async () => {
  const [
    video,
    featuredVideos,
    weeklyQuestion,
    devotional,
    birthdays,
    galleryFeed,
    notices,
    calendar,
  ] = await Promise.all([
    getYouTubeEmbedUrl(),
    getFeaturedVideos(),
    getWeeklyQuestion(),
    getDevotional(),
    getAniversariantesSemana(),
    getGalleryFeed(),
    getNotices(),
    getCalendarEvents(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section com Live/Vídeo */}
      <Live video={video} />

      <div className="container 2xl:max-w-[1600px] mx-auto px-4 py-12 space-y-16">
        {/* Pergunta do Catecismo + Devocional + Aniversariantes */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WeeklyQuestion question={weeklyQuestion} />

          <Devotional devotional={devotional} />

          <Birthdays birthdays={birthdays} />
        </section>

        {/* Avisos */}
        <Notices notices={notices} />

        {/* Pedidos de Oração + Formulário de Sugestões  */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 gap-y-10">
          <PrayerRequests />
          <Suggestions />
        </section>

        {/* Galeria de Fotos */}
        <GalleryFeed feed={galleryFeed} />

        {/* Calendário de Eventos */}
        <Calendar events={calendar} />

        {/* Destaques de Vídeos */}
        <FeaturedVideos videos={featuredVideos} />
      </div>
    </div>
  );
};

export default Home;
