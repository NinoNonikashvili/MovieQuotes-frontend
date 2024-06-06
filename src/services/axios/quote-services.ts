import instance from "@/plugins/axios";
import type { QuoteHeartNotifiation, QuoteNotification } from "@/types/types";

export async function createQuote(payload: FormData) {
  return await instance.post("/api/store-quote", payload);
}
export async function getQuotes(cursor: string | null) {
  return cursor
    ? await instance.get("/api/quotes/", { params: { cursor: cursor } })
    : await instance.get("/api/quotes");
}
export async function getSingleMovieQuotes(payload: { id: string }) {
  return await instance.post("/api/single-movie-quotes", payload);
}

export async function getQuoteComments(id: string) {
  return await instance.get("/api/comments/" + id);
}
export async function deleteQuote(id: string) {
  return await instance.get("api/delete-quote/" + id);
}
export async function updateQuote(payload: FormData, id: string) {
  return await instance.post("/api/update-quote/" + id, payload);
}
export async function getSingleQuote(id: string) {
  return await instance.get("/api/quotes/" + id);
}

export async function addQuoteNotification(payload: QuoteNotification) {
  return await instance.post("/api/add-quote-notification", payload);
}

export async function removeQuoteHeart(payload: QuoteHeartNotifiation) {
  return await instance.post("/api/remove-quote-heart", payload);
}
