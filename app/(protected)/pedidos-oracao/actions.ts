"use server";

import { deletePrayerRequests, putPrayerRequests } from "@/app/api";
import { PrayerRequest } from "./page";

export async function toggleAnswered(request: PrayerRequest) {
  await putPrayerRequests({
    ...request,
    answered: !request.answered,
  });
}

export async function deletePrayer(request: PrayerRequest) {
  await deletePrayerRequests(request);
}
