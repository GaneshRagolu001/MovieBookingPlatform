import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminAddTheater, adminUpdateTheater } from "../../api/adminApi";

export default function AddTheaterForm({
  isOpen,
  onClose,
  onTheaterSaved,
  initialData,
}) {
  const [formData, setFormData] = useState({
    theaterName: "",
    theaterLocation: "",
    theaterCapacity: "",
    theaterScreenType: "2D",
  });
  const [loading, setLoading] = useState(false);

  // List of cities for the dropdown
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Surat",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan-Dombivli",
  ];

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          theaterName: initialData.theaterName || "",
          theaterLocation: initialData.theaterLocation || "",
          theaterCapacity: initialData.theaterCapacity || "",
          theaterScreenType: initialData.theaterScreenType || "2D",
        });
      } else {
        setFormData({
          theaterName: "",
          theaterLocation: "",
          theaterCapacity: "",
          theaterScreenType: "2D",
        });
      }
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = initialData?.theaterId || initialData?.id;

    try {
      if (id) {
        await adminUpdateTheater(id, formData);
      } else {
        await adminAddTheater(formData);
      }
      onTheaterSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving theater details.");
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
        className="bg-[#121212] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl"
      >
        <h2 className="text-xl font-bold text-white mb-6">
          {initialData ? "Edit Theater" : "Add New Theater"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Theater Name */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Theater Name</label>
            <input
              required
              value={formData.theaterName}
              onChange={(e) =>
                setFormData({ ...formData, theaterName: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
              placeholder="e.g. PVR Heritage"
            />
          </div>

          {/* Location Dropdown */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Location (City)</label>
            <select
              required
              value={formData.theaterLocation}
              onChange={(e) =>
                setFormData({ ...formData, theaterLocation: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600 appearance-none"
            >
              <option value="" disabled className="bg-black">
                Select City
              </option>
              {cities.map((city) => (
                <option key={city} value={city} className="bg-[#121212]">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Capacity and Screen Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Capacity</label>
              <input
                required
                type="number"
                value={formData.theaterCapacity}
                onChange={(e) =>
                  setFormData({ ...formData, theaterCapacity: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Screen Type</label>
              <select
                value={formData.theaterScreenType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    theaterScreenType: e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-600"
              >
                <option value="2D" className="bg-[#121212]">
                  2D
                </option>
                <option value="3D" className="bg-[#121212]">
                  3D
                </option>
                <option value="IMAX" className="bg-[#121212]">
                  IMAX
                </option>
                <option value="4DX" className="bg-[#121212]">
                  4DX
                </option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
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
              {loading ? "Saving..." : "Save Theater"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
