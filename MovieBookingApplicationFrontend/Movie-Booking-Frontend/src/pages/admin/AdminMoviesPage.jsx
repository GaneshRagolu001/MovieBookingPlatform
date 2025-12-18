import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { adminListMovies, adminDeleteMovie } from "../../api/adminApi";
import AddMovieForm from "../../components/admin/AddMovieForm";

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await adminListMovies();
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch movies", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddNew = () => {
    setSelectedMovie(null);
    setIsModalOpen(true);
  };

  const handleEdit = (movie) => {
    setSelectedMovie({ ...movie }); 
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!id) return alert("Error: Movie ID not found");
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await adminDeleteMovie(id);
        setMovies(movies.filter((m) => (m.movieId || m.id) !== id));
      } catch (err) {
        alert("Delete failed: Movie might be linked to active shows.");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Manage Movies
        </motion.h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold transition-colors"
        >
          + Add Movie
        </button>
      </div>

      <AddMovieForm
        isOpen={isModalOpen}
        initialData={selectedMovie}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMovie(null); // FIX: Reset to null so next open is clean
        }}
        onMovieSaved={fetchMovies}
      />

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading movies...
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Genre</th>
                  <th className="py-2 pr-4">Language</th>
                  <th className="py-2 pr-4">Release Date</th>
                  <th className="py-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((m) => {
                  const mid = m.movieId || m.id; // Support both naming conventions
                  return (
                    <tr
                      key={mid}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-3 pr-4 font-medium">{m.name}</td>
                      <td className="py-3 pr-4">{m.genre}</td>
                      <td className="py-3 pr-4">{m.language}</td>
                      <td className="py-3 pr-4">{m.releaseDate}</td>
                      <td className="py-3 pr-4 text-right">
                        <button
                          onClick={() => handleEdit(m)}
                          className="text-blue-400 hover:underline mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(mid)}
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
