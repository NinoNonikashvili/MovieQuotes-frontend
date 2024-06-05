import type { QuoteNotification } from "@/types/types";
import { addQuoteNotification } from "@/services/axios/quote-services";

export async function useAddQuoteNotification(payload: QuoteNotification) {
  try {
    await addQuoteNotification(payload);
  } catch (err) {
    return;
  }
}
