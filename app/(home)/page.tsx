import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { Live } from "./_components/Live";
import { FeaturedVideos } from "./_components/FeaturedVideos";
import { getFeaturedVideos } from "../api/videos/featured/getFeaturedVideos";
import { getWeeklyQuestion } from "../api/catecismo/semanal/getWeeklyQuestion";
import { WeeklyQuestion } from "./_components/WeeklyQuestion";
import { Devotional } from "./_components/Devotional";
import { getDevotional } from "../api/pastoral/getDevotional";
import { Birthdays } from "./_components/Birthdays";
import { getBirthdays } from "../api/birthdays/getBirthdays";
import { Calendar } from "./_components/Calendar/Calendar";
import { GalleryFeed } from "./_components/GalleryFeed";
import { getGalleryFeed } from "../api/gallery/getGalleryFeed";
import { Notices } from "./_components/Notices";
import { getNotices } from "../api/notices/getGalleryFeed";
import { Suggestions } from "./_components/Suggetions";

const Home = async () => {
  const [
    video,
    featuredVideos,
    weeklyQuestion,
    devotional,
    birthdays,
    galleryFeed,
    notices,
  ] = await Promise.all([
    getYouTubeEmbedUrl(),
    getFeaturedVideos(),
    getWeeklyQuestion(),
    getDevotional(),
    getBirthdays(),
    getGalleryFeed(),
    getNotices(),
  ]);

  return (
    <div className="min-h-screen">
      {/* TODO: BANNER CAMPANHA */}
      {/* Hero Section com Live/Vídeo */}
      <Live video={video} />

      <div className="container 2xl:max-w-[1600px] mx-auto px-4 py-12 space-y-16">
        {/* Destaques de Vídeos */}
        <FeaturedVideos videos={featuredVideos} />
        {/* Avisos */}
        <Notices notices={notices} />
        {/* Galeria de Fotos */}
        <GalleryFeed feed={galleryFeed} />
        {/* Pergunta do Catecismo + Devocional */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyQuestion question={weeklyQuestion} />

          <Devotional devotional={devotional} />
        </section>
        {/* Aniversariantes da Semana */}
        <Birthdays birthdays={birthdays} />
        {/* Calendário de Eventos */}
        <Calendar />
        {/* Formulário de Sugestões */}
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
