import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Scenario({ scenario }) {
  const [selected, setSelected] = useState(null);

  const chosen = selected !== null ? scenario.options[selected] : null;

  return (
    <div className="card-cream space-y-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🎬</span>
        <div>
          <h3 className="font-extrabold text-navy text-lg mb-2">Scenario</h3>
          <p className="text-mid leading-relaxed">{scenario.prompt}</p>
        </div>
      </div>

      <p className="text-sm font-bold text-mid">What would you do?</p>

      <div className="space-y-2">
        {scenario.options.map((option, i) => (
          <button
            key={option.id}
            onClick={() => setSelected(i)}
            disabled={selected !== null}
            className={`w-full text-left border-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all disabled:cursor-default ${
              selected === null
                ? 'border-gray-200 bg-white hover:border-teal hover:bg-mint'
                : selected === i
                ? option.correct
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : 'border-coral bg-red-50 text-red-800'
                : option.correct
                ? 'border-green-400 bg-green-50 text-green-800'
                : 'border-gray-200 bg-white opacity-50'
            }`}
          >
            <span className="inline-block w-6 font-bold opacity-60 mr-1">{option.id.toUpperCase()}.</span>
            {option.text}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {chosen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${
              chosen.correct
                ? 'bg-green-50 border-green-200'
                : 'bg-amber/20 border-amber/40'
            }`}
          >
            <p className="font-bold mb-1 text-navy">
              {chosen.correct ? '🎉 Great choice!' : '💡 Here\'s a better approach'}
            </p>
            <p className="text-sm text-mid">{chosen.feedback}</p>
            {!chosen.correct && (
              <button
                onClick={() => setSelected(null)}
                className="mt-3 text-sm text-teal font-bold hover:underline"
              >
                Try again →
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
