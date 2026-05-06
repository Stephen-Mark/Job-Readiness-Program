import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-tight mb-3">
              <span className="text-xs font-semibold tracking-widest uppercase opacity-60">Brimbank</span>
              <span className="text-xl font-extrabold tracking-tight">Tech School</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              A STEM Centre of Excellence preparing young people for the world of work.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-3 text-teal">Program</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/modules" className="hover:text-teal transition-colors">All modules</Link></li>
              <li><Link to="/progress" className="hover:text-teal transition-colors">My progress</Link></li>
              <li><Link to="/setup" className="hover:text-teal transition-colors">AI coach setup</Link></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-bold mb-3 text-teal">Supported by</h3>
            <div className="space-y-2 text-sm opacity-80">
              <p className="font-semibold">Victoria University</p>
              <p className="font-semibold">Victorian Department of Education</p>
              <p className="font-semibold">Victoria State Government</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-50">
          <p>© {new Date().getFullYear()} Brimbank Tech School. Work Readiness Program.</p>
          <p>Powered by Anthropic Claude AI</p>
        </div>
      </div>
    </footer>
  );
}
