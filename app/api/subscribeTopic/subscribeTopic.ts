export const subscribeTopic = async (token: string, topics: string[]) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribeTopic`,
    {
      method: "POST",
      body: JSON.stringify({ token, topics }),
    }
  );
  if (!res.ok) {
    throw new Error("Erro ao cadastrar nos tópicos");
  }
  return res.json();
};
