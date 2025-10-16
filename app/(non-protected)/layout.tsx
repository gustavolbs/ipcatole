import { getCampaign } from "@/app/api";
import { CampaignBanner } from "./(home)/_components/CampaignBanner";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const campaign = await getCampaign();

  return (
    <>
      {campaign ? <CampaignBanner {...campaign} /> : null}
      {children}
    </>
  );
}
