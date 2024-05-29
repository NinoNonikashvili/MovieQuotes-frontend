import instance from "@/plugins/axios";

export async function createQuote(payload: FormData) {
  return await instance.post("/api/store-quote", payload);
}
export async function getQuotes() {
  return await instance.get("/api/quotes");
}
