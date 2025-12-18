import axiosClient from "./axiosClient";

export const fetchAllMovies = () => axiosClient.get("/movies/getallmovies"); // GET /api/movies
export const fetchMovieById = (id) =>
  axiosClient.get(`/movies/getmoviebyid/${id}`); // GET /api/movies/{id}
export const searchMovies = (q) =>
  axiosClient.get(`/movies/search?q=${encodeURIComponent(q)}`);
