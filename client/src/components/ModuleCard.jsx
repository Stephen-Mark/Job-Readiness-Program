import { Link } from 'react-router-dom';

export default function ModuleCard({ module, moduleProgress }) {
  const { id, icon, title, description, estimatedTime, badge } = module;
  const completed = moduleProgress?.completed;
  const started = moduleProgress?.started;
  const badgeEarned = moduleProgress?.badgeEarned;

  return (
    <div className={`card flex flex-col gap-3 border-2 transition-all ${
      completed ? 'border-teal' : 'border-transparent'
    }`}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="text-3xl leading-none">{icon}</div>
          <div>
            <p className="text-xs font-bold text-mid uppercase tracking-wide">Module {id}</p>
            <h3 className="font-extrabold text-navy leading-tight">{title}</h3>
          </div>
        </div>
        {badgeEarned && (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 shadow-md"
            style={{ backgroundColor: badge.color + '22', border: `2px solid ${badge.color}` }}
            title={badge.name}
          >
            {badge.emoji}
          </div>
        )}
      </div>

      <p className="text-sm text-mid leading-relaxed flex-1">{description}</p>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-mid">⏱ {estimatedTime}</span>
          {completed && (
            <span className="badge-pill bg-teal/10 text-teal">✅ Complete</span>
          )}
          {started && !completed && (
            <span className="badge-pill bg-amber/20 text-amber-700">In progress</span>
          )}
        </div>
        <Link
          to={`/modules/${id}`}
          className="btn-primary text-sm py-2 px-4"
        >
          {completed ? 'Review' : started ? 'Continue' : 'Start'}
        </Link>
      </div>
    </div>
  );
}
