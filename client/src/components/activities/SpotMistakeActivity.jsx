import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpotMistakeActivity({ activity, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function pick(id) {
    if (submitted) return;
    setSelected(id);
  }

  function submit() {
    if (!selected) return;
    setSubmitted(true);
    const correct = selected === activity.mistakeId;
    setTimeout(() => onComplete && onComplete(correct), 800);
  }

  return (
    <div className="space-y-4">
      <div className="card-cream space-y-2">
        <p className="text-xs font-bold text-mid uppercase tracking-wide">The scene 🎬</p>
        <p className="text-sm text-navy leading-relaxed">{activity.scene}</p>
      </div>
      <p className="text-sm font-bold text-mid">Tap the part of the story that shows the mistake:</p>
      <div className="space-y-2">
        {activity.options.map((opt) => {
          const isPicked = selected === opt.id;
          const isCorrect = submitted && opt.id === activity.mistakeId;
          const isWrong = submitted && isPicked && opt.id !== activity.mistakeId;
          return (
            <button
              key={opt.id}
              onClick={() => pick(opt.id)}
              disabled={submitted}
              className={`w-full text-left text-sm px-4 py-3 rounded-xl border-2 font-semibold transition-all ${
                isCorrect ? 'border-red-500 bg-red-50 text-red-800' :
                isWrong ? 'border-gray-300 bg-gray-50 text-gray-500' :
                isPicked ? 'border-teal bg-mint text-navy' :
                'border-gray-200 bg-white hover:border-teal text-navy'
              }`}
            >
              {isCorrect && <span className="mr-1">⚠️</span>}
              {opt.label}
            </button>
          );
        })}
      </div>
      {!submitted && selected && (
        <button onClick={submit} className="btn-primary text-sm py-2">That's the mistake!</button>
      )}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 text-sm ${selected === activity.mistakeId ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}
          >
            <p className="font-bold mb-1">{selected === activity.mistakeId ? '🎯 You spotted it!' : '🔍 The actual mistake:'}</p>
            <p>{activity.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
