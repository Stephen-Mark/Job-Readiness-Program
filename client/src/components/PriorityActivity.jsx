import { useState } from 'react';
import { motion } from 'framer-motion';

const TASKS = [
  { id: 'a', text: 'Reply to an urgent email from your manager', urgent: true, important: true },
  { id: 'b', text: 'File paperwork from last week', urgent: false, important: false },
  { id: 'c', text: 'Learn a new skill relevant to your role', urgent: false, important: true },
  { id: 'd', text: 'Answer a ringing phone', urgent: true, important: false },
  { id: 'e', text: 'Prepare for tomorrow\'s presentation', urgent: true, important: true },
  { id: 'f', text: 'Chat with a coworker about weekend plans', urgent: false, important: false },
];

const QUADRANTS = [
  { key: 'do', label: 'Do now', sub: 'Urgent + Important', color: 'bg-coral/10 border-coral', badge: 'bg-coral text-white' },
  { key: 'schedule', label: 'Schedule it', sub: 'Important + Not Urgent', color: 'bg-teal/10 border-teal', badge: 'bg-teal text-white' },
  { key: 'delegate', label: 'Minimise', sub: 'Urgent + Not Important', color: 'bg-amber/10 border-amber', badge: 'bg-amber text-white' },
  { key: 'drop', label: 'Drop it', sub: 'Not Urgent + Not Important', color: 'bg-gray-100 border-gray-300', badge: 'bg-gray-400 text-white' },
];

function getCorrectQuadrant(task) {
  if (task.urgent && task.important) return 'do';
  if (!task.urgent && task.important) return 'schedule';
  if (task.urgent && !task.important) return 'delegate';
  return 'drop';
}

export default function PriorityActivity() {
  const [placements, setPlacements] = useState({});
  const [checked, setChecked] = useState(false);

  const unplaced = TASKS.filter((t) => !placements[t.id]);

  function place(taskId, quadrant) {
    setPlacements((prev) => ({ ...prev, [taskId]: quadrant }));
  }

  function checkAnswers() {
    setChecked(true);
  }

  function reset() {
    setPlacements({});
    setChecked(false);
  }

  const score = TASKS.filter((t) => placements[t.id] === getCorrectQuadrant(t)).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-mid">Sort each task into the right quadrant of the Eisenhower Matrix by clicking the task, then choosing where it belongs.</p>

      {/* Unplaced tasks */}
      {unplaced.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-mid uppercase tracking-wide">Tasks to sort:</p>
          <div className="flex flex-wrap gap-2">
            {unplaced.map((task) => (
              <div key={task.id} className="group relative">
                <div className="border-2 border-dashed border-gray-300 bg-white rounded-xl px-3 py-2 text-sm font-semibold text-navy cursor-pointer hover:border-teal hover:bg-mint transition-all">
                  {task.text}
                </div>
                {/* Dropdown on hover */}
                <div className="absolute left-0 top-full mt-1 z-10 hidden group-hover:block bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-max">
                  {QUADRANTS.map((q) => (
                    <button
                      key={q.key}
                      onClick={() => place(task.id, q.key)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-mint font-semibold"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matrix */}
      <div className="grid grid-cols-2 gap-3">
        {QUADRANTS.map((q) => {
          const placed = TASKS.filter((t) => placements[t.id] === q.key);
          return (
            <div key={q.key} className={`border-2 rounded-xl p-3 min-h-28 ${q.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${q.badge}`}>{q.label}</span>
              </div>
              <p className="text-xs text-mid mb-2">{q.sub}</p>
              <div className="space-y-1">
                {placed.map((task) => {
                  const correct = getCorrectQuadrant(task) === q.key;
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-xs rounded-lg px-2 py-1 font-semibold flex items-start gap-1 ${
                        checked
                          ? correct
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          : 'bg-white text-navy'
                      }`}
                    >
                      {checked && <span>{correct ? '✅' : '❌'}</span>}
                      <span>{task.text}</span>
                      {!checked && (
                        <button
                          onClick={() => setPlacements((p) => { const n = {...p}; delete n[task.id]; return n; })}
                          className="ml-auto text-gray-400 hover:text-coral"
                        >×</button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {unplaced.length === 0 && !checked && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={checkAnswers}
          className="btn-primary"
        >
          Check my answers
        </motion.button>
      )}

      {checked && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card border-l-4 border-teal"
        >
          <p className="font-extrabold text-navy">You got {score} out of {TASKS.length} correct!</p>
          <p className="text-sm text-mid mt-1">
            {score === TASKS.length
              ? 'Perfect! You understand the Eisenhower Matrix really well. 🎉'
              : score >= 4
              ? 'Great work! Review the ones that tripped you up.'
              : 'Keep practising — prioritisation is a skill that gets easier over time.'}
          </p>
          <button onClick={reset} className="mt-3 text-sm text-teal font-bold hover:underline">Try again</button>
        </motion.div>
      )}
    </div>
  );
}
