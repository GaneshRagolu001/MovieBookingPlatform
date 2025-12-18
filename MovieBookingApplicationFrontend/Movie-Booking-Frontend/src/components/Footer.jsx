export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="app-container py-6 px-10 text-xs text-gray-400 flex justify-between flex-wrap gap-2">
        <span>© {new Date().getFullYear()} MovieBooking. All rights reserved.</span>
        <span>Built with Spring Boot & React.</span>
      </div>
    </footer>
  );
}
