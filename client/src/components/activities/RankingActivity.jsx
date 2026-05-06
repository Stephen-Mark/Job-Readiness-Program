import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RankingActivity({ activity, onComplete }) {
  const [items, setItems] = useState(() => [...activity.items].sort(() => Math.random() - 0.5));
  const [revealed, setRevealed] = useState(false);

  function moveUp(i) {
    if (i === 0 || revealed) return;
    const next = [...items];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setItems(next);
  }

  function moveDown(i) {
    if (i === items.length - 1 || revealed) return;
    const next = [...items];
    [next[i + 1], next[i]] = [next[i], next[i + 1]];
    setItems(next);
  }

  function reveal() {
    setRevealed(true);
    onComplete && onComplete(true);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-mid">{activity.prompt}</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div key={item.id} layout className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-xl px-4 py-3">
            <span className="w-6 h-6 rounded-full bg-teal/10 text-teal flex items-center justify-center text-xs font-extrabold shrink-0">{i + 1}</span>
            <span className="flex-1 text-sm font-semibold text-navy">{item.label}</span>
            {!revealed && (
              <div className="flex flex-col gap-0.5">
                <button onClick={() => moveUp(i)} disabled={i === 0} className="text-gray-400 hover:text-navy disabled:opacity-20 leading-none text-lg">▲</button>
                <button onClick={() => moveDown(i)} disabled={i === items.length - 1} className="text-gray-400 hover:text-navy disabled:opacity-20 leading-none text-lg">▼</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {!revealed ? (
        <button onClick={reveal} className="btn-primary text-sm py-2">See expert ranking</button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="card border-l-4 border-teal">
          <p className="font-bold text-navy mb-2">Expert ranking:</p>
          {[...activity.items].sort((a, b) => a.rank - b.rank).map((item, i) => (
            <div key={item.id} className="flex items-start gap-2 text-sm mb-1">
              <span className="font-bold text-teal shrink-0">{i + 1}.</span>
              <span className="text-navy font-semibold">{item.label}</span>
              {item.reason && <span className="text-mid"> — {item.reason}</span>}
            </div>
          ))}
          <p className="text-xs text-mid mt-3 italic">{activity.note}</p>
        </motion.div>
      )}
    </div>
  );
}
