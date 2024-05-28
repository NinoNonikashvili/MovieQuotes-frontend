import instance from "@/plugins/axios";
import type { Quote } from "@/types/types";

export async function createQuote(payload: Quote) {
  return await instance.post("/api/create-quote", payload);
}
