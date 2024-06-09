import instance from "@/plugins/axios";

export async function getMovies(cursor: string | null, search: string | null) {
  const params: { [key: string]: string | null } = {};

  if (cursor) {
    params.cursor = cursor;
  }

  if (search) {
    params.search = search;
  }
  return await instance.get("/api/movies", { params: params });
}

export async function getGenres() {
  return await instance.get("/api/genres");
}

export async function addMovie(movie: FormData) {
  return await instance.post("/api/add-movie", movie);
}
export async function editMovie(movie: FormData, id: string) {
  return await instance.post("/api/edit-movie/" + id, movie);
}

export async function deleteMovie(id: number) {
  return await instance.get("/api/delete-movie/" + id);
}

export async function getBilingualMovie(id: number) {
  return await instance.get("/api/movies/" + id);
}
export async function getSingleMovie(id: string) {
  return await instance.get("/api/movies/single/" + id);
}
