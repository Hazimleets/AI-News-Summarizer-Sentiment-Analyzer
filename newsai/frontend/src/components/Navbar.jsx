//frontend/src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/20 backdrop-blur-lg shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-white drop-shadow">
          NewsAI
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/results?keyword=AI" className="text-white hover:text-yellow-300 transition">
            Results
          </Link>
          <Link to="/dashboard" className="text-white hover:text-yellow-300 transition">
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;