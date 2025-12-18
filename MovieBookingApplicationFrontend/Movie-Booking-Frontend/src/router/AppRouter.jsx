import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LandingPage from "../pages/public/LandingPage";
import MoviesPage from "../pages/public/MoviesPage";
import MovieDetailsPage from "../pages/public/MovieDetailsPage";
import BookingSeatSelectionPage from "../pages/user/BookingSeatSelectionPage";
import CheckoutPage from "../pages/user/CheckoutPage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminMoviesPage from "../pages/admin/AdminMoviesPage";
import AdminShowsPage from "../pages/admin/AdminShowsPage";
import AdminBookingsPage from "../pages/admin/AdminBookingsPage";
import ProfilePage from "../pages/user/ProfilePage";
import MyBookingsPage from "../pages/user/MyBookingsPage";
import AdminTheatersPage from "../pages/admin/AdminTheatersPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-linear-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <Navbar />

        <main className="flex-1 py-6 mx-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/book/:showId/seats"
              element={<BookingSeatSelectionPage />}
            />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/checkout/:showId" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="ROLE_ADMIN">
                  <AdminLayout>
                    <AdminDashboardPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/theaters"
              element={
                <ProtectedRoute role="ROLE_ADMIN">
                  <AdminLayout>
                    <AdminTheatersPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/movies"
              element={
                <ProtectedRoute role="ROLE_ADMIN">
                  <AdminLayout>
                    <AdminMoviesPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/shows"
              element={
                <ProtectedRoute role="ROLE_ADMIN">
                  <AdminLayout>
                    <AdminShowsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute role="ROLE_ADMIN">
                  <AdminLayout>
                    <AdminBookingsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
