import axiosClient from "./axiosClient";

/**
 * Get all theaters where a movie is playing
 * Backend:
 * GET /api/theater/gettheatersbymovie/{movieId}
 */
export const fetchTheatersByMovie = (movieId) => {
  return axiosClient.get(`/theater/gettheatersbymovie/${movieId}`);
};

/**
 * (Optional – future use)
 * Get theaters by location (city/area)
 * Backend:
 * GET /api/theater/gettheaterbylocation?location=Hyderabad
 */
export const fetchTheatersByLocation = (location) => {
  return axiosClient.get("/theater/gettheaterbylocation", {
    params: { location },
  });
};

export const fetchListTheaters = () =>
  axiosClient.get("/theater/getalltheaters");
