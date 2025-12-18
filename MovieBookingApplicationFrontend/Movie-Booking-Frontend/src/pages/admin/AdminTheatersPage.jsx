import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { adminListTheaters, adminDeleteTheater } from "../../api/adminApi";
import AddTheaterForm from "../../components/admin/AddTheaterForm";

export default function AdminTheatersPage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);

  const fetchTheaters = async () => {
    try {
      setLoading(true);
      const res = await adminListTheaters();
      setTheaters(res.data || []);
    } catch (err) {
      console.error("Failed to fetch theaters", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  console.log(theaters);
  const handleEdit = (theater) => {
    setSelectedTheater(theater);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedTheater(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure? Deleting a theater will remove all its associated shows."
      )
    ) {
      try {
        await adminDeleteTheater(id);
        setTheaters(theaters.filter((t) => (t.theaterId || t.id) !== id));
      } catch (err) {
        alert(
          "Delete failed. This theater might have active shows or bookings."
        );
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Theaters</h1>
          <p className="text-sm text-gray-400">
            Manage cinema locations and seating capacity
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors shadow-lg"
        >
          + Add Theater
        </button>
      </div>

      <AddTheaterForm
        isOpen={isModalOpen}
        initialData={selectedTheater}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTheater(null);
        }}
        onTheaterSaved={fetchTheaters}
      />

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Theater Name</th>
                  <th className="p-4">City / Location</th>
                  <th className="p-4">Total Seats</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {theaters.map((t) => {
                  const id = t.theaterId || t.id;
                  return (
                    <motion.tr
                      key={id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4 font-semibold text-red-500">
                        {t.theaterName}
                      </td>
                      <td className="p-4 text-gray-300">{t.theaterLocation}</td>
                      <td className="p-4 text-gray-300">
                        <span className="bg-white/10 px-2 py-1 rounded text-xs">
                          {t.theaterCapacity} Seats
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button
                          onClick={() => handleEdit(t)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
            {theaters.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No theaters found. Click "+ Add Theater" to get started.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
