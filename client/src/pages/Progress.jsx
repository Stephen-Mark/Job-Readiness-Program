import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useProgress from '../hooks/useProgress';

const ALL_MODULES = [
  { id: 1, icon: '🤝', title: 'Engaging with an Employer', badge: { emoji: '🤝', name: 'Employer Ready', color: '#2DBFAD' } },
  { id: 2, icon: '💼', title: 'Workplace Etiquette', badge: { emoji: '💼', name: 'Workplace Pro', color: '#1A1753' } },
  { id: 3, icon: '🌟', title: 'Skills, Passions & Career Pathways', badge: { emoji: '🌟', name: 'Self-Aware', color: '#F5A623' } },
  { id: 4, icon: '💻', title: 'Digital Literacy', badge: { emoji: '💻', name: 'Digitally Savvy', color: '#2DBFAD' } },
  { id: 5, icon: '🗣️', title: 'Communication Skills', badge: { emoji: '🗣️', name: 'Communicator', color: '#E8635A' } },
  { id: 6, icon: '📋', title: 'Organisational Skills', badge: { emoji: '📋', name: 'Organised', color: '#F5A623' } },
  { id: 7, icon: '🧠', title: 'Critical Thinking & Problem Solving', badge: { emoji: '🧠', name: 'Problem Solver', color: '#1A1753' } },
  { id: 8, icon: '🎤', title: 'Mock Interviews', badge: { emoji: '🎤', name: 'Interview Ready', color: '#E8635A' } },
];

function motivationalMessage(percentage) {
  if (percentage === 0) return { text: "Ready to start? Your first module is waiting — let's go! 🚀", tone: 'neutral' };
  if (percentage < 30) return { text: "Great start! You're building real skills. Keep the momentum going! 💪", tone: 'positive' };
  if (percentage < 60) return { text: "You're almost halfway there — you're doing amazing. Don't stop now! 🔥", tone: 'positive' };
  if (percentage < 100) return { text: "So close! Just a few more modules and you'll be fully work ready. 🌟", tone: 'excited' };
  return { text: "🏆 You did it! You're officially Work Ready. Every employer would be lucky to have you.", tone: 'celebration' };
}

function formatDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Progress() {
  const { progress, getOverallProgress, getLastIncompleteModule, resetProgress } = useProgress();
  const { completed, total, percentage } = getOverallProgress();
  const nextModule = getLastIncompleteModule();
  const message = motivationalMessage(percentage);

  function handleReset() {
    if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      resetProgress();
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-navy mb-2">My progress</h1>
      <p className="text-mid mb-8">Track your journey through the Work Readiness Program.</p>

      {/* Completion card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="font-extrabold text-navy text-xl">{completed} of {total} modules complete</h2>
            <p className={`text-sm mt-1 font-semibold ${
              message.tone === 'celebration' ? 'text-teal' :
              message.tone === 'excited' ? 'text-amber' : 'text-mid'
            }`}>{message.text}</p>
          </div>
          <div className="text-4xl font-extrabold text-teal shrink-0">{percentage}%</div>
        </div>
        <div className="progress-bar-track h-5">
          <motion.div
            className="progress-bar-fill h-5"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        {nextModule && (
          <div className="mt-5">
            <Link to={`/modules/${nextModule}`} className="btn-primary">
              Continue with module {nextModule} →
            </Link>
          </div>
        )}

        {percentage === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mt-6 flex items-center gap-4 bg-teal/10 border-2 border-teal rounded-2xl p-4"
          >
            <div className="text-5xl">🏆</div>
            <div>
              <p className="font-extrabold text-navy text-lg">Work Ready!</p>
              <p className="text-sm text-mid">You've completed all 8 modules. Time to take on the world.</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Badge wall */}
      <div className="mb-8">
        <h2 className="section-heading">Your badges</h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {ALL_MODULES.map((m, i) => {
            const modProg = progress.modules[m.id] || {};
            const earned = modProg.badgeEarned;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center gap-1"
                title={m.badge.name}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
                    earned
                      ? 'shadow-md ring-2'
                      : 'grayscale opacity-30'
                  }`}
                  style={earned ? {
                    background: `radial-gradient(circle at 35% 35%, ${m.badge.color}33, ${m.badge.color}11)`,
                    ringColor: m.badge.color,
                    border: `2px solid ${m.badge.color}`,
                  } : { background: '#e5e7eb' }}
                >
                  {m.badge.emoji}
                </div>
                <p className="text-xs text-center text-mid font-semibold leading-tight">{m.badge.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Module list */}
      <div className="mb-8">
        <h2 className="section-heading">Module history</h2>
        <div className="space-y-2">
          {ALL_MODULES.map((m) => {
            const modProg = progress.modules[m.id] || {};
            return (
              <div key={m.id} className="card flex items-center gap-4 py-3">
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-navy text-sm">{m.title}</p>
                  <p className="text-xs text-mid">
                    {modProg.completed
                      ? `Completed ${formatDate(modProg.completedAt)}`
                      : modProg.started
                      ? `Started ${formatDate(modProg.startedAt)}`
                      : 'Not started'}
                  </p>
                </div>
                {modProg.quizScore && (
                  <span className="badge-pill bg-gray-100 text-mid text-xs">
                    {modProg.quizScore}%
                  </span>
                )}
                <div className="shrink-0">
                  {modProg.completed ? (
                    <span className="badge-pill bg-teal/10 text-teal">✅ Done</span>
                  ) : modProg.started ? (
                    <Link to={`/modules/${m.id}`} className="badge-pill bg-amber/20 text-amber-700 hover:bg-amber hover:text-white transition-colors">
                      Continue →
                    </Link>
                  ) : (
                    <Link to={`/modules/${m.id}`} className="badge-pill bg-gray-100 text-mid hover:bg-navy hover:text-white transition-colors">
                      Start
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="text-center pt-4 border-t border-gray-200">
        <button
          onClick={handleReset}
          className="text-sm text-mid hover:text-coral transition-colors font-semibold"
        >
          Reset all progress
        </button>
      </div>
    </div>
  );
}
