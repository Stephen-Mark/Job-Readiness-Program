import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartoonPanel from './CartoonPanel';
import ConceptQuiz from './ConceptQuiz';
import TrueFalseActivity from './activities/TrueFalseActivity';
import MatchingActivity from './activities/MatchingActivity';
import OrderingActivity from './activities/OrderingActivity';
import SpotMistakeActivity from './activities/SpotMistakeActivity';
import ReflectionActivity from './activities/ReflectionActivity';
import FillBlankActivity from './activities/FillBlankActivity';
import RankingActivity from './activities/RankingActivity';

const TYPE_LABELS = {
  truefalse: { icon: '✅', label: 'True or False?' },
  matching: { icon: '🔗', label: 'Match it up' },
  ordering: { icon: '📋', label: 'Put in order' },
  spotmistake: { icon: '🔍', label: 'Spot the mistake' },
  reflection: { icon: '💭', label: 'Your reflection' },
  fillblank: { icon: '✏️', label: 'Fill the gaps' },
  ranking: { icon: '🏆', label: 'Rank it' },
};

function ActivityCard({ activity, index, onComplete, completed }) {
  const [open, setOpen] = useState(false);
  const meta = TYPE_LABELS[activity.type] || { icon: '🎯', label: 'Activity' };

  return (
    <div className={`border-2 rounded-2xl transition-colors ${completed ? 'border-teal bg-teal/5' : 'border-gray-200 bg-white'}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <span className="text-xl">{meta.icon}</span>
        <div className="flex-1">
          <p className="text-xs font-bold text-mid uppercase tracking-wide">Activity {index + 1}</p>
          <p className="font-extrabold text-navy text-sm">{activity.title || meta.label}</p>
        </div>
        {completed && <span className="text-teal font-bold text-sm">✓ Done</span>}
        <span className="text-mid text-sm">{open ? '▲' : '▼'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              {activity.type === 'truefalse' && <TrueFalseActivity activity={activity} onComplete={(ok) => { onComplete(ok); }} />}
              {activity.type === 'matching' && <MatchingActivity activity={activity} onComplete={(ok) => { onComplete(ok); }} />}
              {activity.type === 'ordering' && <OrderingActivity activity={activity} onComplete={(ok) => { onComplete(ok); }} />}
              {activity.type === 'spotmistake' && <SpotMistakeActivity activity={activity} onComplete={(ok) => { onComplete(ok); }} />}
              {activity.type === 'reflection' && <ReflectionActivity activity={activity} onComplete={(ok) => { onComplete(ok); }} />}
              {activity.type === 'fillblank' && <FillBlankActivity activity={activity} onComplete={(ok) => { onComplete(ok); }} />}
              {activity.type === 'ranking' && <RankingActivity activity={activity} onComplete={(ok) => { onComplete(ok); }} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConceptSection({ concept, index, onConceptComplete, isCompleted }) {
  const [open, setOpen] = useState(false);
  const [completedActivities, setCompletedActivities] = useState(new Set());
  const [quizDone, setQuizDone] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  function markActivity(i) {
    setCompletedActivities((prev) => new Set([...prev, i]));
  }

  function handleQuizComplete(score, passed) {
    setQuizScore(score);
    setQuizDone(true);
    if (passed) onConceptComplete && onConceptComplete(index);
  }

  const activitiesDone = completedActivities.size;
  const totalActivities = concept.activities?.length || 0;
  const allActivitiesDone = activitiesDone === totalActivities;

  return (
    <div className={`rounded-2xl border-2 transition-all ${isCompleted ? 'border-teal' : 'border-gray-200'} overflow-hidden`}>
      {/* Concept header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left bg-white hover:bg-mint transition-colors"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 ${isCompleted ? 'bg-teal text-white' : 'bg-gray-100 text-mid'}`}>
          {isCompleted ? '✓' : index + 1}
        </div>
        <div className="flex-1">
          <p className="font-extrabold text-navy">{concept.title}</p>
          {totalActivities > 0 && (
            <p className="text-xs text-mid">{activitiesDone}/{totalActivities} activities done</p>
          )}
        </div>
        <span className="text-mid">{open ? '▲' : '▼'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-4 bg-white space-y-6 border-t border-gray-100">
              {/* Cartoon */}
              {concept.cartoon && <CartoonPanel cartoon={concept.cartoon} />}

              {/* Body text */}
              <div className="card-cream">
                <p className="text-sm text-navy leading-relaxed font-semibold">{concept.body}</p>
              </div>

              {/* Fun fact / tip */}
              {concept.tip && (
                <div className="flex items-start gap-3 bg-amber/10 border border-amber/30 rounded-xl px-4 py-3">
                  <span className="text-xl shrink-0">💡</span>
                  <p className="text-sm font-semibold text-navy">{concept.tip}</p>
                </div>
              )}

              {/* Activities */}
              {concept.activities?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-extrabold text-navy flex items-center gap-2">
                    🎯 Activities
                    <span className="text-xs font-bold text-mid bg-gray-100 px-2 py-0.5 rounded-full">
                      {activitiesDone}/{totalActivities} done
                    </span>
                  </h4>
                  {concept.activities.map((activity, i) => (
                    <ActivityCard
                      key={i}
                      activity={activity}
                      index={i}
                      completed={completedActivities.has(i)}
                      onComplete={() => markActivity(i)}
                    />
                  ))}
                </div>
              )}

              {/* Concept quiz */}
              {concept.quiz?.length > 0 && (
                <div className="border-2 border-navy/10 rounded-2xl p-4 space-y-3 bg-mint/30">
                  <h4 className="font-extrabold text-navy flex items-center gap-2">✏️ Concept check quiz</h4>
                  {!quizDone ? (
                    <ConceptQuiz questions={concept.quiz} onComplete={handleQuizComplete} />
                  ) : (
                    <div className="text-center space-y-2 py-2">
                      <p className="text-2xl font-extrabold text-teal">{quizScore}%</p>
                      <p className="text-sm font-bold text-navy">{quizScore >= 70 ? '✅ Concept complete!' : 'Have another look and try again.'}</p>
                      {quizScore < 70 && (
                        <button onClick={() => { setQuizDone(false); setQuizScore(null); }} className="btn-outline text-sm py-1.5 px-4">Retry quiz</button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
