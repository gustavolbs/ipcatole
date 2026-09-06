import { permanentRedirect } from "next/navigation";

export default async function CatecismoLegacyDetailPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  const documentId =
    type === "breve"
      ? "breve-catecismo-westminster"
      : "catecismo-maior-westminster";

  permanentRedirect(`/documentos/${documentId}`);
}
