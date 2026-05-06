import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrderingActivity({ activity, onComplete }) {
  const [items, setItems] = useState(() =>
    [...activity.items].sort(() => Math.random() - 0.5)
  );
  const [checked, setChecked] = useState(false);
  const [dragging, setDragging] = useState(null);

  function moveUp(i) {
    if (i === 0 || checked) return;
    const next = [...items];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setItems(next);
  }

  function moveDown(i) {
    if (i === items.length - 1 || checked) return;
    const next = [...items];
    [next[i + 1], next[i]] = [next[i], next[i + 1]];
    setItems(next);
  }

  function check() {
    setChecked(true);
    const correct = items.every((item, i) => item.order === i + 1);
    setTimeout(() => onComplete && onComplete(correct), 800);
  }

  function reset() {
    setItems([...activity.items].sort(() => Math.random() - 0.5));
    setChecked(false);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-mid font-semibold">Use the arrows to put these steps in the correct order.</p>
      <div className="space-y-2">
        {items.map((item, i) => {
          const isCorrect = checked && item.order === i + 1;
          const isWrong = checked && item.order !== i + 1;
          return (
            <motion.div
              key={item.id}
              layout
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${
                isCorrect ? 'border-green-500 bg-green-50' :
                isWrong ? 'border-red-400 bg-red-50' :
                'border-gray-200 bg-white'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                isCorrect ? 'bg-green-500 text-white' :
                isWrong ? 'bg-red-400 text-white' :
                'bg-gray-100 text-mid'
              }`}>{i + 1}</span>
              <span className="flex-1 text-sm font-semibold text-navy">{item.label}</span>
              {!checked && (
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => moveUp(i)} disabled={i === 0} className="text-gray-400 hover:text-navy disabled:opacity-20 text-lg leading-none">▲</button>
                  <button onClick={() => moveDown(i)} disabled={i === items.length - 1} className="text-gray-400 hover:text-navy disabled:opacity-20 text-lg leading-none">▼</button>
                </div>
              )}
              {checked && (
                <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
              )}
            </motion.div>
          );
        })}
      </div>
      {checked && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-cream text-sm">
          <p className="font-bold text-navy mb-1">Correct order:</p>
          {[...activity.items].sort((a, b) => a.order - b.order).map((item, i) => (
            <p key={item.id} className="text-mid">{i + 1}. {item.label}</p>
          ))}
        </motion.div>
      )}
      <div className="flex gap-2">
        {!checked && <button onClick={check} className="btn-primary text-sm py-2">Check order</button>}
        {checked && <button onClick={reset} className="btn-outline text-sm py-2">Shuffle & try again</button>}
      </div>
    </div>
  );
}
