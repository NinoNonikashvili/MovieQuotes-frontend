import instance from "@/plugins/axios";

export async function getMovies() {
  return await instance.get("/api/movies");
}

export async function getGenres() {
  return await instance.get("/api/genres");
}

export async function addMovie(movie: FormData) {
  return await instance.post("/api/add-movie", movie);
}
export async function editMovie(movie: FormData, id:string) {
  return await instance.post("/api/edit-movie/"+id, movie);
}

export async function deleteMovie(id: number) {
  return await instance.get("/api/delete-movie/" + id);
}

export async function getBilingualMovie(id: number) {
  return await instance.get("/api/movies/" + id);
}
