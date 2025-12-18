import { useEffect, useState } from "react";
import { adminListConfirmedBookings } from "../../api/adminApi";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await adminListConfirmedBookings();
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Booking History</h1>
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading all bookings...
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="py-2 pr-4">User ID</th>
                  <th className="py-2 pr-4">Movie</th>
                  <th className="py-2 pr-4">Seats</th>
                  <th className="py-2 pr-4">Price</th>
                  <th className="py-2 pr-4">Booking Time</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="py-3 pr-4">User #{b.userId}</td>
                    <td className="py-3 pr-4 font-medium">
                      {b.show?.movie?.name}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded">
                        {b.seatNumbers?.join(", ")}
                      </span>
                    </td>
                    <td className="py-3 pr-4">₹{b.price}</td>
                    <td className="py-3 pr-4 text-gray-400">
                      {new Date(b.bookingTime).toLocaleDateString()}
                    </td>
                    <td className="py-3 pr-4 font-bold text-green-400">
                      {b.bookingStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No bookings found in database.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
