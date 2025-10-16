import { getCampaign } from "@/app/api";
import { CampaignBanner } from "./(home)/_components/CampaignBanner";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const campaign = await getCampaign();

  return (
    <>
      <CampaignBanner {...campaign} />
      {children}
    </>
  );
}
