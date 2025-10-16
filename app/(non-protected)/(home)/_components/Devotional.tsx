import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

export type Devotional = {
  author: string;
  title: string;
  description: string;
};
export const Devotional = ({ devotional }: { devotional: Devotional }) => {
  return (
    <Card className="shadow-card border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-secondary" />
          Devocional do Dia
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-semibold text-secondary text-lg">
          {devotional.title}
        </p>
        <p className="text-sm text-muted-foreground italic">
          {devotional.author}
        </p>
        <p className="text-sm leading-relaxed">{devotional.description}</p>
      </CardContent>
    </Card>
  );
};
