import { useState, useEffect } from 'react';
import axios from 'axios';
import ModuleCard from '../components/ModuleCard';
import useProgress from '../hooks/useProgress';

export default function ModuleList() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { progress, getOverallProgress } = useProgress();
  const { completed, total, percentage } = getOverallProgress();

  useEffect(() => {
    axios.get('/api/modules')
      .then((r) => setModules(r.data))
      .catch(() => setError('Could not load modules — please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-mid font-semibold">Loading modules...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <p className="text-coral font-bold text-lg">{error}</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-navy mb-2">All modules</h1>
        <p className="text-mid">Work through all 8 modules to become fully work ready. Earn a badge for each one you complete.</p>
      </div>

      {/* Overall progress */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-navy">Your progress</h2>
          <span className="text-teal font-extrabold text-lg">{percentage}%</span>
        </div>
        <div className="progress-bar-track h-4">
          <div className="progress-bar-fill h-4" style={{ width: `${percentage}%` }} />
        </div>
        <p className="text-sm text-mid mt-2">
          {completed === 0 && 'You haven\'t started yet — jump in! 🚀'}
          {completed > 0 && completed < total && `${completed} of ${total} modules complete. Keep going — you're doing great!`}
          {completed === total && '🏆 All modules complete! You\'re officially work ready!'}
        </p>
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            moduleProgress={progress.modules[module.id]}
          />
        ))}
      </div>
    </div>
  );
}
