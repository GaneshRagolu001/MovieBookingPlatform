import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  fetchUserBookings,
  confirmBooking,
  cancelBooking,
} from "../../api/bookingApi";
import { AuthUser } from "../../context/AuthContext";

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [bookingUpdate, setBookingUpdate] = useState(false);

  const { user } = AuthUser();
  const userId = user?.userId;

  useEffect(() => {
    const getBookings = async () => {
      try {
        setLoading(true);
        const res = await fetchUserBookings(userId);
        const sortedBookings = res.data.sort(
          (a, b) => new Date(b.bookingTime) - new Date(a.bookingTime)
        );
        setBookings(sortedBookings);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) getBookings();
  }, [userId, bookingUpdate]);

  console.log(bookings);

  // Logic to check if cancellation is allowed (30 mins before show)
  const isActionable = (showTime) => {
    const now = new Date();
    const show = new Date(showTime);
    const diffInMinutes = (show - now) / 1000 / 60;
    return diffInMinutes > 30;
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      setProcessingId(id);
      await cancelBooking(id);
      alert("Booking cancelled successfully.");
      setBookingUpdate(true); // Refresh list
    } catch (error) {
      alert("Failed to cancel booking.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleConfirm = async (id) => {
    try {
      setProcessingId(id);
      await confirmBooking(id);
      alert("Booking confirmed!");
      setBookingUpdate(true);
    } catch (error) {
      alert("Error confirming booking.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading your tickets...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">My Bookings</h1>
          <p className="text-gray-400">Manage your reservations</p>
        </div>
        <p className="text-xs text-yellow-500 italic">
          * Cancellation allowed up to 30 mins before show
        </p>
      </header>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
          <p className="text-gray-400">No bookings found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking, index) => {
            const canModify = isActionable(booking.show?.showTime);
            const isPending = booking.bookingStatus === "PENDING";

            return (
              <motion.div
                key={booking.bookingId || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden bg-white/5 border ${
                  booking.bookingStatus === "CANCELLED"
                    ? "border-red-900/50 opacity-60"
                    : "border-white/10"
                } rounded-2xl flex flex-col md:flex-row`}
              >
                {/* Left Side: Info */}
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
                          booking.bookingStatus === "CONFIRMED"
                            ? "bg-green-500/20 text-green-500"
                            : booking.bookingStatus === "CANCELLED"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {/* UI Logic: If Pending but time passed, visually show as Confirmed (matching backend logic) */}
                        {!canModify && isPending
                          ? "CONFIRMED (AUTO)"
                          : booking.bookingStatus}
                      </span>
                      <h2 className="text-2xl font-bold text-white mt-1">
                        {booking.show?.movie?.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        ₹{booking.price}
                      </p>
                      <p className="text-xs text-gray-400">Total Paid</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Date</p>
                      <p className="text-sm font-medium">
                        {new Date(booking.show?.showTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Time</p>
                      <p className="text-sm font-medium">
                        {new Date(booking.show?.showTime).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Seats</p>
                      <p className="text-sm font-medium text-red-400">
                        {booking.seatNumbers?.join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Status</p>
                      <p
                        className={`text-sm font-medium ${
                          canModify ? "text-green-400" : "text-gray-500"
                        }`}
                      >
                        {canModify ? "Modifiable" : "Locked"}
                      </p>
                    </div>
                  </div>

                  {/* Buttons Section */}
                  {canModify && booking.bookingStatus !== "CANCELLED" && (
                    <div className="flex gap-3 pt-2">
                      {isPending && (
                        <button
                          onClick={() => handleConfirm(booking.bookingId)}
                          disabled={processingId === booking.bookingId}
                          className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition"
                        >
                          Confirm Now
                        </button>
                      )}
                      <button
                        onClick={() => handleCancel(booking.bookingId)}
                        disabled={processingId === booking.bookingId}
                        className="px-4 py-1.5 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold rounded-lg transition"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Side: Visual Stub */}
                <div className="bg-white/10 p-6 md:w-64 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-dashed border-white/20">
                  <div className="text-center space-y-1">
                    <p className="text-sm font-bold text-white">
                      {booking.show?.theater?.theaterName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {booking.show?.theater?.theaterLocation}
                    </p>
                  </div>
                  <div className="mt-4 w-full h-12 bg-white/20 rounded flex items-center justify-center overflow-hidden grayscale">
                    <div className="w-full h-full opacity-30 flex gap-1 px-2">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-white h-full"
                          style={{ width: `${Math.random() * 5 + 1}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] text-gray-500 font-mono tracking-tighter">
                    ID: {booking.bookingId}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookingsPage;
