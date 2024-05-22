import instance from "@/plugins/axios";

export async function loadMoviesAndQuotes(payload: string) {
  return await instance.post("/api/movies-and-quotes", { key: payload });
}
