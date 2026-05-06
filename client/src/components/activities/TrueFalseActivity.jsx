import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TrueFalseActivity({ activity, onComplete }) {
  const [answered, setAnswered] = useState(null);

  function pick(choice) {
    if (answered !== null) return;
    setAnswered(choice);
    setTimeout(() => onComplete && onComplete(choice === activity.answer), 1200);
  }

  const correct = answered === activity.answer;

  return (
    <div className="space-y-4">
      <div className="card-cream text-center px-6 py-5">
        <p className="text-lg font-bold text-navy leading-snug">{activity.statement}</p>
      </div>
      <div className="flex gap-3">
        {['True', 'False'].map((opt) => {
          const isAnswer = opt === activity.answer;
          const isPicked = answered === opt;
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={answered !== null}
              className={`flex-1 py-4 rounded-2xl font-extrabold text-lg transition-all border-2 ${
                answered === null
                  ? opt === 'True'
                    ? 'border-teal text-teal hover:bg-teal hover:text-white'
                    : 'border-coral text-coral hover:bg-coral hover:text-white'
                  : isAnswer
                  ? 'bg-green-500 border-green-500 text-white'
                  : isPicked
                  ? 'bg-red-400 border-red-400 text-white'
                  : 'border-gray-200 text-gray-300'
              }`}
            >
              {opt === 'True' ? '✅ True' : '❌ False'}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {answered !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 text-sm font-semibold ${correct ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}
          >
            {correct ? '🎉 Correct! ' : '🤔 Not quite. '}{activity.explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
