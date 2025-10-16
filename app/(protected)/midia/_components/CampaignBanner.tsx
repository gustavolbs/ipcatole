"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { getCampaign, putCampaign } from "@/app/api";
import { Textarea } from "@/components/ui/textarea";

import { Switch } from "@/components/ui/switch";
import { CampaignBannerProps } from "@/app/(non-protected)/(home)/_components";

const LIMIT = 140;
export const CampaignBanner = () => {
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<CampaignBannerProps>(
    {} as CampaignBannerProps
  );

  // Busca inicial — carrega a campanha já salva no banco
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCampaign();
        setCampaign(data);
        console.log("Campanha semanal carregada:", data);
      } catch (error) {
        console.error("Erro ao carregar campanha semanal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveCampaign = async () => {
    try {
      await putCampaign(campaign);
      toast.success("Campanha salva com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar campanha");
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Campanhas</CardTitle>
        <CardDescription>
          Configure o texto e a visibilidade da campanha principal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="campaign-description">Texto da Campanha</Label>
          <Textarea
            id="campaign-description"
            placeholder="Digite o texto da campanha"
            value={campaign.description}
            rows={3}
            maxLength={LIMIT}
            onChange={(e) =>
              setCampaign({ ...campaign, description: e.target.value })
            }
          />
          <p className="text-sm text-muted-foreground text-right">
            {campaign.description?.length || 0}/{LIMIT}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="campaign-active"
            checked={campaign.isActive}
            onCheckedChange={(checked) =>
              setCampaign({ ...campaign, isActive: checked })
            }
          />
          <Label htmlFor="campaign-active">
            Campanha {campaign.isActive ? "ativa" : "inativa"}
          </Label>
        </div>

        <Button
          onClick={handleSaveCampaign}
          className="w-full sm:w-auto"
          disabled={!campaign || loading}
        >
          Salvar Campanha
        </Button>
      </CardContent>
    </Card>
  );
};
