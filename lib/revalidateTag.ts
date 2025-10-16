"use server";

import { revalidateTag as cacheRevalidation } from "next/cache";

export async function revalidateTag(tag: string) {
  cacheRevalidation(tag);
}
