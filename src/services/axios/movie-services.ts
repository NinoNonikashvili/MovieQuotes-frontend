import instance from "@/plugins/axios";

export async function getMovies() {
  return await instance.get("/api/movies");
}

export async function getGenres() {
  return await instance.get("/api/genres");
}

export async function addMovie(movie:FormData){
  return await instance.post('/api/add-movie', movie)
}
