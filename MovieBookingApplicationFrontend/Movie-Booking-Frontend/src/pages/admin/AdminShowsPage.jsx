import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { adminListShows, adminDeleteShow } from "../../api/adminApi";
import AddShowForm from "../../components/admin/AddShowForm"; // We will create this

export default function AdminShowsPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  const fetchShows = async () => {
    try {
      setLoading(true);
      const res = await adminListShows();
      setShows(res.data);
    } catch (err) {
      console.error("Failed to fetch shows", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleEdit = (show) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedShow(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Delete this show? All associated bookings will be affected."
      )
    ) {
      try {
        await adminDeleteShow(id);
        // Correcting id check to match showId or id
        setShows(shows.filter((s) => (s.showId || s.id) !== id));
      } catch (err) {
        alert("Error deleting show.");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Shows</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold transition-colors"
        >
          + Add Show
        </button>
      </div>

      <AddShowForm
        isOpen={isModalOpen}
        initialData={selectedShow}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedShow(null);
        }}
        onShowSaved={fetchShows}
      />

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading shows...
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="py-2 pr-4">Movie</th>
                  <th className="py-2 pr-4">Theater</th>
                  <th className="py-2 pr-4">Date & Time</th>
                  <th className="py-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shows.map((s) => {
                  const showId = s.showId || s.id;
                  return (
                    <tr
                      key={showId}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-3 pr-4 font-medium text-red-500">
                        {s.movie?.name}
                      </td>
                      <td className="py-3 pr-4">{s.theater?.theaterName}</td>
                      <td className="py-3 pr-4">
                        {new Date(s.showTime).toLocaleString()}
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <button
                          onClick={() => handleEdit(s)}
                          className="text-blue-400 hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(showId)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
