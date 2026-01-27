import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            Quick<span className="text-indigo-600">Task</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link
            to="/"
            className={`relative ${
              isActive("/")
                ? "text-indigo-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Dashboard
            {isActive("/") && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-indigo-600 rounded-full" />
            )}
          </Link>

          <Link
            to="/tasks"
            className={`relative ${
              isActive("/tasks")
                ? "text-indigo-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tasks
            {isActive("/tasks") && (
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-indigo-600 rounded-full" />
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="ml-6 text-sm text-slate-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Subtle bottom separator */}
      <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
    </header>
  );
}
