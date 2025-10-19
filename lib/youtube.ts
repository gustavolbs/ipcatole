const CHANNEL_ID = "UC_2HBNGAUETOKtX16CoKROg";
const API_KEY = process.env.YOUTUBE_API_KEY!;

export interface YouTubeVideo {
  embedUrl: string;
  isLive: boolean;
}

/**
 * Verifica se há live ativa. Caso não, retorna o último vídeo embed.
 */
export async function getYouTubeEmbedUrl(): Promise<YouTubeVideo> {
  try {
    // 🔴 Primeiro: verificar se há live ativa
    const liveRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`,
      {
        cache: "no-store",
      }
    );
    const liveData = await liveRes.json();

    if (liveData.items && liveData.items.length > 0) {
      const liveId = liveData.items[0].id.videoId;
      return {
        embedUrl: `https://www.youtube.com/embed/${liveId}`,
        isLive: true,
      };
    }

    // 🟢 Caso não tenha live, pega o último vídeo publicado
    const res2 = await fetch(
      `https://www.youtube.com/channel/${CHANNEL_ID}/videos`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );
    const html2 = await res2.text();

    const match = html2.match(/"videoId":"(.*?)"/);
    if (match && match[1]) {
      return {
        embedUrl: `https://www.youtube.com/embed/${match[1]}`,
        isLive: false,
      };
    }

    throw new Error("Nenhum vídeo encontrado");
  } catch (err) {
    console.error("Erro ao buscar vídeo do YouTube:", err);
    return {
      embedUrl: `https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`,
      isLive: false,
    };
  }
}
