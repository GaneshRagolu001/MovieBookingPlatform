import axiosClient from "./axiosClient";

// --- Movies ---
export const adminAddMovie = (data) =>
  axiosClient.post("/movies/addmovie", data);

export const adminListMovies = () => axiosClient.get("/movies/getallmovies");

export const adminUpdateMovie = (id, data) =>
  axiosClient.put(`/movies/updatemovie/${id}`, data);

export const adminDeleteMovie = (id) =>
  axiosClient.delete(`/movies/deletemovie/${id}`);

// --- Shows ---
export const adminAddShow = (data) =>
  axiosClient.post("/shows/createshow", data);

export const adminListShows = () => axiosClient.get("/shows/getallshows");

// NEW: Added update method for shows
export const adminUpdateShow = (id, data) =>
  axiosClient.put(`/shows/updateshow/${id}`, data);

export const adminDeleteShow = (id) =>
  axiosClient.delete(`/shows/deleteshow/${id}`);

// --- Theaters (Needed for Show Dropdowns) ---
// --- Theaters ---
export const adminAddTheater = (data) =>
  axiosClient.post("/theater/addtheater", data);

export const adminListTheaters = () =>
  axiosClient.get("/theater/getalltheaters");

export const adminUpdateTheater = (id, data) =>
  axiosClient.put(`/theater/updatetheater/${id}`, data);

export const adminDeleteTheater = (id) =>
  axiosClient.delete(`/theater/deletetheater/${id}`);

// --- Bookings & Stats ---
export const adminListConfirmedBookings = () =>
  axiosClient.get("/bookings/getbookingbystatus/CONFIRMED");

// --- Admin Management ---
export const adminRegisterNewAdmin = (data) =>
  axiosClient.post("/admin/registeradminuser", data);
