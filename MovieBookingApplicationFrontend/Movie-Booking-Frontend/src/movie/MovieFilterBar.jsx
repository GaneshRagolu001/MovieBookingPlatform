import { useState } from "react";

export default function MovieFilterBar({ onFilter }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={handleChange}
        className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-primary"
      />
    </div>
  );
}
