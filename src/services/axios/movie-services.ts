import instance from "@/plugins/axios";

export async function getMovies() {
  return await instance.get("/api/movies");
}