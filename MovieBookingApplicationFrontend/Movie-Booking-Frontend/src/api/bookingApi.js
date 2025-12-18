import axiosClient from "./axiosClient";

// Create a new booking
export const createBooking = (payload) =>
  axiosClient.post("/bookings/createbooking", payload);

// Get all bookings for a specific user
export const fetchUserBookings = (id) =>
  axiosClient.get(`/bookings/getuserbookings/${id}`);

// Get all bookings for a specific show (used for the Seat Selection grid)
export const fetchShowBookings = (id) =>
  axiosClient.get(`/bookings/getshowbookings/${id}`);

// Confirm a pending booking (Manual trigger)
export const confirmBooking = (id) =>
  axiosClient.put(`/bookings/confirmBooking/${id}`);

// Cancel a booking (Manual trigger)
export const cancelBooking = (id) =>
  axiosClient.put(`/bookings/cancelBooking/${id}`); // Note: Matches your typo 'cancelBooling' in Java

// Filter bookings by status (Admin use)
export const fetchBookingsByStatus = (status) =>
  axiosClient.get(`/bookings/getbookingbystatus/${status}`);
