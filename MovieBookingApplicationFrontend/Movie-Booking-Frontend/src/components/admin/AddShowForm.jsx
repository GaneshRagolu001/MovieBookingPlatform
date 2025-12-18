import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  adminAddShow,
  adminUpdateShow,
  adminListMovies,
  adminListTheaters,
} from "../../api/adminApi";

export default function AddShowForm({
  isOpen,
  onClose,
  onShowSaved,
  initialData,
}) {
  const emptyForm = useMemo(
    () => ({
      movieId: "",
      theaterId: "",
      showTime: "",
      price: "",
    }),
    []
  );

  const [formData, setFormData] = useState(emptyForm);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch dependency data (Movies and Theaters)
  useEffect(() => {
    if (isOpen) {
      const loadOptions = async () => {
        const [movieRes, theaterRes] = await Promise.all([
          adminListMovies(),
          adminListTheaters(),
        ]);
        setMovies(movieRes.data);
        setTheaters(theaterRes.data);
      };
      loadOptions();
    }
  }, [isOpen]);

  // Pre-fill if Edit Mode
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Format ISO string to datetime-local format (YYYY-MM-DDTHH:mm)
        const date = new Date(initialData.showTime);
        const formattedDate = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16);

        setFormData({
          movieId: initialData.movie?.movieId || initialData.movie?.id || "",
          theaterId:
            initialData.theater?.theaterId || initialData.theater?.id || "",
          showTime: formattedDate,
          price: initialData.price || "",
        });
      } else {
        setFormData(emptyForm);
      }
    }
  }, [initialData, isOpen, emptyForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = initialData?.showId || initialData?.id;

    console.log(formData);
    try {
      if (id) {
        await adminUpdateShow(id, formData);
      } else {
        await adminAddShow(formData);
      }
      onShowSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Action failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#121212] border border-white/10 p-6 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-white mb-6">
          {initialData ? "Edit Show" : "Add New Show"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Select Movie</label>
            <select
              required
              name="movieId"
              value={formData.movieId}
              onChange={(e) =>
                setFormData({ ...formData, movieId: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            >
              <option value="" className="bg-black">
                Choose a movie...
              </option>
              {movies.map((m) => (
                <option
                  key={m.movieId || m.id}
                  value={m.movieId || m.id}
                  className="bg-black"
                >
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Select Theater</label>
            <select
              required
              name="theaterId"
              value={formData.theaterId}
              onChange={(e) =>
                setFormData({ ...formData, theaterId: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            >
              <option value="" className="bg-black">
                Choose a theater...
              </option>
              {theaters.map((t) => (
                <option
                  key={t.theaterId || t.id}
                  value={t.theaterId || t.id}
                  className="bg-black"
                >
                  {t.theaterName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Show Date & Time</label>
            <input
              required
              type="datetime-local"
              name="showTime"
              value={formData.showTime}
              onChange={(e) =>
                setFormData({ ...formData, showTime: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Ticket Price</label>
            <input
              required
              type="number"
              placeholder="e.g. 250"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : initialData ? "Update Show" : "Add Show"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
