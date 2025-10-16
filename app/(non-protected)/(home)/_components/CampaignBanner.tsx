"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export type CampaignBannerProps = {
  description: string;
  isActive: boolean;
};

export function CampaignBanner({ description, isActive }: CampaignBannerProps) {
  const [visible, setVisible] = useState(isActive);
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-primary/80 text-foreground p-4 rounded-lg shadow-lg flex items-center justify-between z-50">
      <p className="text-sm whitespace-pre-wrap font-semibold">{description}</p>
      <Button variant="ghost" size="icon" onClick={() => setVisible(false)}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
