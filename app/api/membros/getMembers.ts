// GET → todos ou filtrados
export const getMembers = async (name?: string, email?: string) => {
  const params = new URLSearchParams();
  if (name) params.append("name", name);
  if (email) params.append("email", email);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/membros?${params.toString()}`,
    {
      cache: "force-cache",
      next: { tags: ["members"] },
    }
  );

  if (!res.ok) throw new Error("Erro ao buscar membros");
  return res.json();
};

// GET → apenas um membro
export const getMember = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/membros?id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Erro ao buscar membro");
  return res.json();
};
