import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

import TheaterCard from "../../components/theater/theaterCard";
import ShowTimeGroup from "../../components/theater/ShowTimeGroup";

import { fetchMovieById } from "../../api/movieApi";
import {
  fetchListTheaters,
  fetchTheatersByLocation,
} from "../../api/theaterApi";
import { fetchShowsByMovie } from "../../api/showApi";
import { ShowAndTheater } from "../../context/ShowContext";

export default function MovieDetailsPage() {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const { addShowAndTheater } = ShowAndTheater();

  const heroRef = useRef(null);
  const posterRef = useRef(null);

  const [movie, setMovie] = useState(null);
  const [location, setLocation] = useState("");
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [shows, setShows] = useState([]);

  // --- NEW STATE FOR DATE SELECTION ---
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  /* 1. Fetch movie & Generate Dates */
  useEffect(() => {
    if (!movieId) return;
    fetchMovieById(movieId).then((res) => {
      const movieData = res.data;
      setMovie(movieData);

      // Generate 5 days starting from releaseDate
      const start = new Date(movieData.releaseDate);
      const dates = [];
      for (let i = 0; i < 5; i++) {
        const nextDate = new Date(start);
        nextDate.setDate(start.getDate() + i);
        dates.push(nextDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
      }
      setAvailableDates(dates);
      setSelectedDate(dates[0]); // Default to first date
    });
  }, [movieId]);

  /* 2. Fetch theaters by location */
  useEffect(() => {
    if (!location) {
      fetchListTheaters().then((res) => {
        setTheaters(res.data);
        setSelectedTheater(null);
        setShows([]);
      });
    } else {
      fetchTheatersByLocation(location)
        .then((res) => {
          setTheaters(res.data);
          setSelectedTheater(null);
          setShows([]);
        })
        .catch(() => setTheaters([]));
    }
  }, [location]);

  /* 3. Fetch shows (Filtered by Theater AND Date) */
  useEffect(() => {
    if (!selectedTheater || !selectedDate) return;

    // Assuming your API can take a date parameter
    fetchShowsByMovie(movieId, selectedTheater.id, selectedDate)
      .then((res) => {
        // If your API doesn't filter by date, filter manually:
        // const filtered = res.data.filter(s => s.showDate === selectedDate);
        setShows(res.data);
      })
      .catch(() => setShows([]));
  }, [selectedTheater, movieId, selectedDate]);

  /* Animations */
  useEffect(() => {
    if (!heroRef.current || !posterRef.current) return;
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1 }
    );
    gsap.fromTo(
      posterRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 }
    );
  }, [movie]);

  const handleShowSelect = (showItem) => {
    const currentShow = shows.find((ele) => ele.showId === showItem.showId);
    addShowAndTheater(currentShow, selectedTheater);
    navigate(`/book/${showItem.showId}/seats`);
  };

  if (!movie) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-[50vh] md:h-[60vh] rounded-xl overflow-hidden max-w-7xl mx-auto"
      >
        <img
          src={movie.headerimgurl}
          alt={movie.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/95" />
        <div className="absolute bottom-6 left-6 md:left-10 max-w-xl space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {movie.name}
          </h1>
          <p className="text-sm text-gray-300">
            {movie.genre} • {movie.language} • {movie.duration} mins
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4">
        {/* Left: Poster */}
        <div
          ref={posterRef}
          className="hidden md:block w-64 rounded-xl overflow-hidden shadow-lg sticky top-24 h-fit"
        >
          <img
            src={movie.normalimgurl}
            alt={movie.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Booking Logic */}
        <div className="flex-1 space-y-8">
          {/* STEP 1: DATE SELECTION */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="bg-[#e50914] w-2 h-6 rounded-full inline-block"></span>
              Select Date
            </h2>
            <h2 className=" font-semibold flex items-center gap-2">
              <span className="bg-[#e50914] w-2 h-6 rounded-full inline-block"></span>
              Release Date : {movie.releaseDate}
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {availableDates.map((dateString) => {
                const dateObj = new Date(dateString);
                const isSelected = selectedDate === dateString;
                return (
                  <button
                    key={dateString}
                    onClick={() => {
                      setSelectedDate(dateString);
                      setShows([]); // Clear shows when date changes
                    }}
                    className={`flex flex-col items-center min-w-[70px] py-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-[#e50914] border-[#e50914] text-white shadow-lg shadow-red-900/20"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    <span className="text-xs uppercase font-medium">
                      {dateObj.toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </span>
                    <span className="text-lg font-bold">
                      {dateObj.getDate()}
                    </span>
                    <span className="text-xs">
                      {dateObj.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: LOCATION & THEATER */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Select Theater</h2>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white/10 text-gray-500 border border-white/10 px-3 py-1.5 rounded-md text-sm outline-none focus:border-[#e50914]"
              >
                <option value="">Null</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Surat">Surat</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Kanpur">Kanpur</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Indore">Indore</option>
                <option value="Thane">Thane</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Visakhapatnam">Visakhapatnam</option>
                <option value="Pimpri-Chinchwad">Pimpri-Chinchwad</option>
                <option value="Patna">Patna</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Ghaziabad">Ghaziabad</option>
                <option value="Ludhiana">Ludhiana</option>
                <option value="Agra">Agra</option>
                <option value="Nashik">Nashik</option>
                <option value="Faridabad">Faridabad</option>
                <option value="Meerut">Meerut</option>
                <option value="Rajkot">Rajkot</option>
                <option value="Kalyan-Dombivli">Kalyan-Dombivli</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {theaters.map((theater) => (
                <TheaterCard
                  key={theater.theaterId}
                  theater={theater}
                  selected={selectedTheater?.id === theater.id}
                  onSelect={setSelectedTheater}
                />
              ))}
            </div>
          </div>

          {/* STEP 3: SHOW TIMES */}
          {selectedTheater && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10"
            >
              <h3 className="text-lg font-semibold mb-4 text-[#e50914]">
                Available Shows at {selectedTheater.name}
              </h3>
              {shows.length > 0 ? (
                <ShowTimeGroup shows={shows} onSelectShow={handleShowSelect} />
              ) : (
                <p className="text-gray-500 italic">
                  No shows available for {new Date(selectedDate).toDateString()}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
