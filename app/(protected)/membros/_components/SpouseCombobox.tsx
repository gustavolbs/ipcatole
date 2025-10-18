"use client";

import { useState, useMemo } from "react";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Member } from "../page";

type Props = {
  members: Member[];
  value: string; // Nome do cônjuge
  excludeId?: string; // Para não listar ele mesmo
  onChange: (name: string, id?: string) => void;
};

export const SpouseCombobox = ({
  members,
  value,
  excludeId,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredMembers = useMemo(() => {
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) &&
        m._id !== excludeId
    );
  }, [members, query, excludeId]);

  const handleSelect = (name: string, id?: string) => {
    onChange(name, id);
    setOpen(false);
    setQuery("");
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    onChange(val);
  };

  return (
    <div className="grid gap-2">
      <Label>Cônjuge</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value || "Selecione ou digite um nome..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0 bg-popover" align="start">
          <Command>
            <CommandInput
              placeholder="Pesquisar membro ou digite um nome..."
              value={query}
              onValueChange={handleInputChange}
            />
            <CommandList>
              <CommandEmpty>Nenhum membro encontrado.</CommandEmpty>
              <CommandGroup>
                {filteredMembers.map((member) => (
                  <CommandItem
                    key={member._id}
                    value={member.name}
                    onSelect={() => handleSelect(member.name, member._id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === member.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {member.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
