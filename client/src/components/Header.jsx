import { Link, NavLink, useLocation } from 'react-router-dom';
import useProgress from '../hooks/useProgress';

export default function Header() {
  const { getOverallProgress } = useProgress();
  const { completed, total, percentage } = getOverallProgress();
  const location = useLocation();

  const navLink = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `font-bold text-sm px-3 py-2 rounded-lg transition-colors ${
          isActive ? 'bg-teal text-white' : 'text-navy hover:bg-mint'
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Wordmark */}
        <Link to="/" className="flex flex-col leading-tight select-none">
          <span className="text-xs font-semibold text-navy tracking-widest uppercase opacity-70">Brimbank</span>
          <span className="text-lg font-extrabold text-navy tracking-tight">Tech School</span>
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navLink('/', 'Home')}
          {navLink('/modules', 'Modules')}
          {navLink('/progress', 'My progress')}
        </nav>

        {/* Progress pill */}
        {completed > 0 && (
          <Link
            to="/progress"
            className="hidden md:flex items-center gap-2 bg-mint px-3 py-1.5 rounded-full hover:bg-teal hover:text-white transition-colors group"
          >
            <span className="text-xs font-bold text-teal group-hover:text-white">
              {completed}/{total} modules
            </span>
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal group-hover:bg-white rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </Link>
        )}
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden border-t border-gray-100 px-4 py-2 flex gap-2 overflow-x-auto">
        {navLink('/', 'Home')}
        {navLink('/modules', 'Modules')}
        {navLink('/progress', 'Progress')}
      </div>
    </header>
  );
}
