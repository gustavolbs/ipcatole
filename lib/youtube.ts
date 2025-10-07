const CHANNEL_ID = "UC_2HBNGAUETOKtX16CoKROg";

export interface YouTubeVideo {
  embedUrl: string;
  isLive: boolean;
}

/**
 * Verifica se há live ativa. Caso não, retorna o último vídeo embed.
 */
export async function getYouTubeEmbedUrl(): Promise<YouTubeVideo> {
  const liveUrl = `https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}`;

  try {
    const res = await fetch(liveUrl);
    const html = await res.text();

    // Se tiver uma tag indicando live, retorna live
    if (
      html.includes('itemprop="isLiveBroadcast"') ||
      html.includes('"isLive":true')
    ) {
      return {
        embedUrl: liveUrl,
        isLive: true,
      };
    }

    // Se não tiver live, tentar pegar o último vídeo via scraping simples
    const channelVideosPage = `https://www.youtube.com/channel/${CHANNEL_ID}/videos`;
    const res2 = await fetch(channelVideosPage);
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
      embedUrl: liveUrl, // fallback
      isLive: false,
    };
  }
}
