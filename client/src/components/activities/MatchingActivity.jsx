import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MatchingActivity({ activity, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState({});
  const [checked, setChecked] = useState(false);

  const allMatched = Object.keys(matches).length === activity.pairs.length;

  function pickLeft(id) {
    if (checked) return;
    setSelected(id);
  }

  function pickRight(id) {
    if (checked || !selected) return;
    setMatches((m) => ({ ...m, [selected]: id }));
    setSelected(null);
  }

  function check() {
    setChecked(true);
    const correct = activity.pairs.every((p) => matches[p.left.id] === p.right.id);
    setTimeout(() => onComplete && onComplete(correct), 800);
  }

  function reset() {
    setMatches({});
    setSelected(null);
    setChecked(false);
  }

  const matchedRightIds = Object.values(matches);

  return (
    <div className="space-y-4">
      <p className="text-sm text-mid font-semibold">Click an item on the left, then its match on the right.</p>
      <div className="grid grid-cols-2 gap-3">
        {/* Left */}
        <div className="space-y-2">
          {activity.pairs.map((p) => {
            const isMatched = matches[p.left.id] !== undefined;
            const isSelected = selected === p.left.id;
            const isCorrect = checked && matches[p.left.id] === p.right.id;
            const isWrong = checked && isMatched && matches[p.left.id] !== p.right.id;
            return (
              <button
                key={p.left.id}
                onClick={() => pickLeft(p.left.id)}
                disabled={isMatched && !checked}
                className={`w-full text-left text-sm font-bold px-3 py-3 rounded-xl border-2 transition-all ${
                  isSelected ? 'border-teal bg-mint' :
                  isCorrect ? 'border-green-500 bg-green-50 text-green-800' :
                  isWrong ? 'border-red-400 bg-red-50 text-red-800' :
                  isMatched ? 'border-gray-300 bg-gray-50 opacity-60' :
                  'border-gray-200 bg-white hover:border-teal'
                }`}
              >
                {p.left.label}
              </button>
            );
          })}
        </div>
        {/* Right */}
        <div className="space-y-2">
          {activity.pairs.map((p) => {
            const isMatched = matchedRightIds.includes(p.right.id);
            const leftKey = Object.keys(matches).find((k) => matches[k] === p.right.id);
            const isCorrect = checked && leftKey && matches[leftKey] === p.right.id && leftKey === activity.pairs.find(pp => pp.right.id === p.right.id)?.left.id;
            const isWrong = checked && isMatched && !isCorrect;
            return (
              <button
                key={p.right.id}
                onClick={() => pickRight(p.right.id)}
                disabled={isMatched || !selected}
                className={`w-full text-left text-sm font-semibold px-3 py-3 rounded-xl border-2 transition-all ${
                  isCorrect ? 'border-green-500 bg-green-50 text-green-800' :
                  isWrong ? 'border-red-400 bg-red-50 text-red-800' :
                  isMatched ? 'border-gray-300 bg-gray-50 opacity-60' :
                  selected ? 'border-teal/50 bg-mint/50 hover:border-teal hover:bg-mint cursor-pointer' :
                  'border-gray-200 bg-white cursor-default'
                }`}
              >
                {p.right.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2">
        {allMatched && !checked && (
          <button onClick={check} className="btn-primary text-sm py-2">Check my answers</button>
        )}
        {checked && (
          <button onClick={reset} className="btn-outline text-sm py-2">Try again</button>
        )}
      </div>
    </div>
  );
}
