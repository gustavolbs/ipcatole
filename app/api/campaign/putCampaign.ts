import { type CampaignBannerProps } from "@/app/(non-protected)/(home)/_components";
import { revalidateTag } from "@/lib/revalidateTag";

export const putCampaign = async (campaign: CampaignBannerProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campaign`, {
    method: "PUT",
    body: JSON.stringify(campaign),
  });
  if (!res.ok) {
    throw new Error("Erro ao atualizar campanha");
  }
  revalidateTag("active-campaign");
  return res.json();
};
