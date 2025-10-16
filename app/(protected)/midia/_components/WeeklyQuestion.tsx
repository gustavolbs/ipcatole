"use client";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import breveCatecismo from "@/data/catecismo-breve";
import { getWeeklyQuestion, putWeeklyQuestion } from "@/app/api";

export const WeeklyQuestion = () => {
  const [catechismQuestion, setCatechismQuestion] = useState<string>("");
  const [catechismOpen, setCatechismOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Busca inicial — carrega a pergunta já salva no banco
  useEffect(() => {
    const fetchWeeklyQuestion = async () => {
      try {
        const data = await getWeeklyQuestion();
        if (data?.number) {
          setCatechismQuestion(data.number);
        }
      } catch (error) {
        console.error("Erro ao carregar pergunta semanal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyQuestion();
  }, []);

  const handleSaveCatechism = async () => {
    try {
      await putWeeklyQuestion(catechismQuestion);
      toast.success("Pergunta do catecismo salva com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar pergunta do catecismo");
    }
  };

  const selectedCatechism = useMemo(() => {
    return breveCatecismo.find((q) => q.number === catechismQuestion);
  }, [catechismQuestion]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Pergunta Semanal do Catecismo</CardTitle>
        <CardDescription>
          Selecione a pergunta do Breve Catecismo de Westminster
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Número da Pergunta (001-107)</Label>
          <Popover open={catechismOpen} onOpenChange={setCatechismOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={catechismOpen}
                className="w-full justify-between"
                disabled={loading}
              >
                {loading
                  ? "Carregando..."
                  : catechismQuestion
                  ? `Pergunta ${catechismQuestion}`
                  : "Selecione uma pergunta..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-popover" align="start">
              <Command>
                <CommandInput placeholder="Pesquisar pergunta..." />
                <CommandList>
                  <CommandEmpty>Nenhuma pergunta encontrada.</CommandEmpty>
                  <CommandGroup>
                    {breveCatecismo.map((question) => (
                      <CommandItem
                        key={question.number}
                        value={`${question.number} ${question.title}`}
                        onSelect={() => {
                          setCatechismQuestion(question.number);
                          setCatechismOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            catechismQuestion === question.number
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex-1">
                          <div className="font-medium">
                            Pergunta {question.number}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {question.title}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {selectedCatechism && (
          <div className="p-4 rounded-lg space-y-2">
            <div>
              <p className="font-semibold text-primary">
                {selectedCatechism.number}. {selectedCatechism.title}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">R:</span>{" "}
                {selectedCatechism.answer}
              </p>
              <small className="text-muted-foreground">
                <span className="font-medium text-foreground">refs:</span>{" "}
                {selectedCatechism.refs}
              </small>
            </div>
          </div>
        )}

        <Button
          onClick={handleSaveCatechism}
          className="w-full sm:w-auto"
          disabled={!catechismQuestion || loading}
        >
          Salvar Pergunta
        </Button>
      </CardContent>
    </Card>
  );
};
