import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  adminListMovies,
  adminListShows,
  adminListConfirmedBookings,
  adminListTheaters,
} from "../../api/adminApi";
import { Link } from "react-router-dom";

function StatCard({ label, value, sub, colorClass }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/10 hover:border-white/20 transition-all"
    >
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        {label}
      </p>
      <div className="flex items-baseline gap-2 mt-2">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
      <p className={`text-xs mt-2 font-medium ${colorClass}`}>{sub}</p>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalShows: 0,
    totalTheaters: 0,
    ticketsSold: 0,
    revenue: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [movieRes, showRes, bookingRes, theaterRes] = await Promise.all([
          adminListMovies(),
          adminListShows(),
          adminListConfirmedBookings(),
          adminListTheaters(),
        ]);

        const allBookings = bookingRes.data || [];
        const totalRevenue = allBookings.reduce(
          (sum, b) => sum + (b.price || 0),
          0
        );
        const totalSeats = allBookings.reduce(
          (sum, b) => sum + (b.numberOfSeats || 0),
          0
        );

        setStats({
          totalMovies: movieRes.data?.length || 0,
          totalShows: showRes.data?.length || 0,
          totalTheaters: theaterRes.data?.length || 0,
          ticketsSold: totalSeats,
          revenue: totalRevenue,
        });

        setRecentBookings(allBookings.slice(-6).reverse());
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">System Overview</h1>
        <p className="text-gray-500 mt-1">
          Real-time statistics for your cinema network.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Movies"
          value={stats.totalMovies}
          sub="↑ 2 new this week"
          colorClass="text-green-500"
        />
        <StatCard
          label="Shows"
          value={stats.totalShows}
          sub="Scheduled Today"
          colorClass="text-blue-500"
        />
        <StatCard
          label="Theaters"
          value={stats.totalTheaters}
          sub="Active Sites"
          colorClass="text-purple-500"
        />
        <StatCard
          label="Tickets"
          value={stats.ticketsSold}
          sub="Total Seats Filled"
          colorClass="text-orange-500"
        />
        <StatCard
          label="Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          sub="Gross Earnings"
          colorClass="text-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-[#0A0A0F] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="font-bold text-white">Recent Transactions</h2>
            <button className="text-xs text-red-500 font-bold hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.02] text-gray-500 text-[10px] uppercase tracking-tighter">
                <tr>
                  <th className="py-4 px-6">Customer / Booking ID</th>
                  <th className="py-4 px-6">Movie</th>
                  <th className="py-4 px-6">Seats</th>
                  <th className="py-4 px-6 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <p className="font-medium text-white text-xs">#{b.id}</p>
                      <p className="text-[10px] text-gray-500">
                        {new Date(b.bookingTime).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="py-4 px-6 font-semibold text-red-500">
                      {b.show?.movie?.name || "Deleted Movie"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-gray-300">
                        {b.seatNumbers?.join(", ")}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-white">
                      ₹{b.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Theater Distribution */}
        <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white mb-6">System Health</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">Server Load</span>
                <span className="text-green-500">Optimal</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[35%] bg-green-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">Database Storage</span>
                <span className="text-yellow-500">65%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-yellow-500" />
              </div>
            </div>
            <div className="pt-4">
              <Link
                to="/admin/shows"
                className="block w-full text-center py-3 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
              >
                Generate Daily Report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
