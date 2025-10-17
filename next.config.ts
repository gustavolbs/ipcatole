import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  headers: async () => [
    // Páginas: cache por 1h no edge, atualiza em background
    {
      source: "/(.*)",
      headers: [
        // {
        //   key: "Cache-Control",
        //   value:
        //     "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        // },
        // TODO: desabilitar cache por enquanto
        {
          key: "Cache-Control",
          value: "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
        { key: "Pragma", value: "no-cache" },
        { key: "Expires", value: "0" },
      ],
    },
    // API: nunca cachear
    {
      source: "/api(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "private, no-store",
        },
      ],
    },
    // Imagens do /public/img: cache longo
    {
      source: "/img/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
