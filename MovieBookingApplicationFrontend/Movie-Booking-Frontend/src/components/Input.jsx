export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          px-4 py-2 rounded-lg bg-white/10 border border-white/10
          focus:border-primary focus:outline-none
          text-sm
        "
      />
    </div>
  );
}
