import instance from "@/plugins/axios";
import type { Quote } from "@/types/types";

export async function createQuote(payload: FormData) {
  return await instance.post("/api/store-quote", payload);
}
