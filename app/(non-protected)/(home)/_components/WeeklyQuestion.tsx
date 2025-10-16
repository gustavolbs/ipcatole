import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export type Question = {
  number: string;
  title: string;
  answer: string;
  refs: string;
};
export const WeeklyQuestion = ({ question }: { question: Question }) => {
  return (
    <Card className="shadow-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Pergunta Semanal - Breve Catecismo de Westminster
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-semibold text-primary">
            {question.number}. {question.title}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">R:</span>{" "}
            {question.answer}
          </p>
          <small className="text-muted-foreground">
            <span className="font-medium text-foreground">refs:</span>{" "}
            {question.refs}
          </small>
        </div>
      </CardContent>
    </Card>
  );
};
