import axiosClient from "./axiosClient";

/**
 * Get all shows for a movie (legacy / admin / fallback use)
 * Backend:
 * GET /api/shows/getshowsbymovie/{movieId}
 */
export const fetchShowsByMovie = (movieId) => {
  return axiosClient.get(`/shows/getshowsbymovie/${movieId}`);
};

/**
 * Get shows for a specific movie in a specific theater
 * (MAIN user flow)
 *
 * Backend:
 * GET /api/shows/getshowsbymovieandtheater?movieId=1&theaterId=2
 */
export const fetchShowsByMovieAndTheater = (movieId, theaterId) => {
  return axiosClient.get("/shows/getshowsbymovieandtheater", {
    params: { movieId, theaterId },
  });
};

/**
 * Get seats for a specific show
 *
 * Backend:
 * GET /api/seats/getbyshow/{showId}
 * (recommended)
 */
export const fetchShowSeats = (showId) => {
  return axiosClient.get(`/seats/getbyshow/${showId}`);
};
