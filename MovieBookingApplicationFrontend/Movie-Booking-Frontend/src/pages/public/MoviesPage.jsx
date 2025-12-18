import { useEffect, useState } from "react";
import MovieCard from "../../movie/MovieCard";
import MovieFilterBar from "../../movie/MovieFilterBar";
import { motion } from "framer-motion";
import { fetchAllMovies } from "../../api/movieApi";
export default function MoviesPage() {
  // TEMPORARY MOCK DATA (backend integration later)

  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState(movies);

  useEffect(() => {
    let mounted = true;
    fetchAllMovies()
      .then((res) => {
        if (!mounted) return;
        setMovies(res.data);
        setFiltered(res.data);
      })
      .catch((err) => {
        console.error("fetchAllMovies error", err);
        // fallback: keep empty list or show toast
      });
    return () => (mounted = false);
  }, []);

  console.log(movies);
  const filterMovies = (search) => {
    const s = search.toLowerCase();
    setFiltered(
      movies.filter(
        (m) =>
          m.title.toLowerCase().includes(s) ||
          m.genre.toLowerCase().includes(s) ||
          m.language.toLowerCase().includes(s)
      )
    );
  };

  return (
    <div className="space-y-6 mx-15">
      <motion.h1
        className="text-2xl md:text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Movies
      </motion.h1>

      <MovieFilterBar onFilter={filterMovies} />

      <div
        className="
          grid 
          grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-4
        "
      >
        {filtered.map((movie) => (
          <MovieCard key={movie.movieId} movie={movie} />
        ))}
      </div>
    </div>
  );
}
