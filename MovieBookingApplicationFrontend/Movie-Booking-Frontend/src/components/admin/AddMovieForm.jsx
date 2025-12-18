import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { adminAddMovie, adminUpdateMovie } from "../../api/adminApi";

export default function AddMovieForm({
  isOpen,
  onClose,
  onMovieSaved,
  initialData,
}) {
  const emptyForm = useMemo(
    () => ({
      name: "",
      genre: "",
      language: "",
      duration: "",
      releaseDate: "",
      description: "",
      headerimgurl: "",
      normalimgurl: "",
    }),
    []
  );

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Format date for HTML input
        const formattedDate = initialData.releaseDate
          ? initialData.releaseDate.split("T")[0]
          : "";
        setFormData({ ...initialData, releaseDate: formattedDate });
      } else {
        setFormData(emptyForm);
      }
    }
  }, [initialData, isOpen, emptyForm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get ID from initialData (crucial for update vs add)
    const movieId = initialData?.movieId || initialData?.id;

    try {
      if (movieId) {
        console.log("Attempting to UPDATE movie with ID:", movieId);
        await adminUpdateMovie(movieId, formData);
      } else {
        console.log("Attempting to ADD new movie");
        await adminAddMovie(formData);
      }
      onMovieSaved();
      onClose();
    } catch (err) {
      console.error("API Error:", err);
      alert(`Error: ${err.response?.data?.message || "Action failed"}`);
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
        className="bg-[#121212] border border-white/10 p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {initialData ? "Edit Movie" : "Add New Movie"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Movie Title</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Genre</label>
            <input
              required
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Language</label>
            <input
              required
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Duration (mins)</label>
            <input
              required
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Release Date</label>
            <input
              required
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Poster URL</label>
            <input
              required
              name="normalimgurl"
              value={formData.normalimgurl}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs text-gray-400">Header Image URL</label>
            <input
              required
              name="headerimgurl"
              value={formData.headerimgurl}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs text-gray-400">Description</label>
            <textarea
              required
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
            />
          </div>

          <div className="md:col-span-2 pt-4 flex gap-3">
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
              {loading
                ? "Saving..."
                : initialData
                ? "Update Movie"
                : "Add Movie"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
