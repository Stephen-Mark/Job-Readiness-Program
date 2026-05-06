import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useProgress from '../hooks/useProgress';

const MODULES = [
  { id: 1, icon: '🤝', title: 'Engaging with an Employer', desc: 'Build positive relationships with supervisors and show real initiative.' },
  { id: 2, icon: '💼', title: 'Workplace Etiquette', desc: 'Master the unwritten rules that make workplaces run smoothly.' },
  { id: 3, icon: '🌟', title: 'Skills, Passions & Career Pathways', desc: 'Discover your strengths and connect them to real career options.' },
  { id: 4, icon: '💻', title: 'Digital Literacy', desc: 'Build the digital skills every modern workplace expects.' },
  { id: 5, icon: '🗣️', title: 'Communication Skills', desc: 'Listen, speak clearly, and handle difficult conversations with confidence.' },
  { id: 6, icon: '📋', title: 'Organisational Skills', desc: 'Manage your time, prioritise tasks, and never miss a deadline.' },
  { id: 7, icon: '🧠', title: 'Critical Thinking & Problem Solving', desc: 'Identify problems, generate solutions, and make good decisions.' },
  { id: 8, icon: '🎤', title: 'Mock Interviews', desc: 'Practise interview answers and get personalised AI feedback.' },
];

const BENEFITS = [
  { icon: '🚀', title: 'Hands-on learning', desc: 'Interactive scenarios and activities — not just reading.' },
  { icon: '🤖', title: 'AI coaching', desc: 'Get personalised feedback from your AI coach, available 24/7.' },
  { icon: '🏆', title: 'Earn badges', desc: 'Collect a badge for each module you complete.' },
  { icon: '📱', title: 'Learn anywhere', desc: 'Works on any device — phone, tablet, or laptop.' },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  };
}

export default function Home() {
  const { getOverallProgress, getLastIncompleteModule } = useProgress();
  const { completed, total, percentage } = getOverallProgress();
  const nextModule = getLastIncompleteModule();

  return (
    <div className="blob-bg">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        <motion.div {...fadeUp(0)}>
          <span className="inline-block bg-teal/10 text-teal font-bold px-4 py-1.5 rounded-full text-sm mb-4">
            🚀 Work Readiness Program
          </span>
        </motion.div>
        <motion.h1 {...fadeUp(0.1)} className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight mb-4">
          Preparing young people for the{' '}
          <span className="text-teal">world of work</span>
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="text-lg text-mid max-w-2xl mx-auto leading-relaxed mb-8">
          Eight interactive modules covering everything you need to walk into a workplace — and thrive. Built for Year 9–12 students at Brimbank Tech School.
        </motion.p>
        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 justify-center">
          {nextModule ? (
            <Link to={`/modules/${nextModule}`} className="btn-primary text-base">
              {completed > 0 ? 'Continue learning →' : 'Start your journey →'}
            </Link>
          ) : (
            <Link to="/modules/1" className="btn-primary text-base">
              Start your journey →
            </Link>
          )}
          <Link to="/modules" className="btn-outline text-base">
            View all modules
          </Link>
        </motion.div>

        {/* Progress bar if started */}
        {completed > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-sm mx-auto"
          >
            <div className="flex justify-between text-sm font-bold text-mid mb-2">
              <span>{completed} of {total} modules complete</span>
              <span className="text-teal">{percentage}%</span>
            </div>
            <div className="progress-bar-track h-3">
              <div className="progress-bar-fill h-3" style={{ width: `${percentage}%` }} />
            </div>
          </motion.div>
        )}
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="card text-center"
            >
              <div className="text-3xl mb-2">{b.icon}</div>
              <h3 className="font-extrabold text-navy text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-mid leading-snug">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Module grid */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="section-heading text-center mb-8">The 8 modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Link
                to={`/modules/${m.id}`}
                className="card flex flex-col gap-2 hover:border-teal border-2 border-transparent h-full group"
              >
                <span className="text-3xl">{m.icon}</span>
                <p className="text-xs font-bold text-mid">Module {m.id}</p>
                <h3 className="font-extrabold text-navy text-sm group-hover:text-teal transition-colors">{m.title}</h3>
                <p className="text-xs text-mid leading-snug">{m.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
