import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FillBlankActivity({ activity, onComplete }) {
  const [answers, setAnswers] = useState(activity.blanks.map(() => ''));
  const [checked, setChecked] = useState(false);

  function check() {
    setChecked(true);
    const correct = activity.blanks.every((blank, i) =>
      blank.answers.some((a) => a.toLowerCase().trim() === answers[i].toLowerCase().trim())
    );
    setTimeout(() => onComplete && onComplete(correct), 800);
  }

  function reset() {
    setAnswers(activity.blanks.map(() => ''));
    setChecked(false);
  }

  const parts = activity.sentence.split('___');

  return (
    <div className="space-y-4">
      <div className="card-cream">
        <p className="text-xs font-bold text-mid uppercase tracking-wide mb-3">Complete the sentence:</p>
        <div className="flex flex-wrap items-center gap-1 text-sm font-semibold text-navy leading-loose">
          {parts.map((part, i) => (
            <span key={i} className="flex items-center gap-1 flex-wrap">
              <span>{part}</span>
              {i < activity.blanks.length && (
                <input
                  value={answers[i]}
                  onChange={(e) => {
                    const next = [...answers];
                    next[i] = e.target.value;
                    setAnswers(next);
                  }}
                  disabled={checked}
                  placeholder="______"
                  className={`border-b-2 text-center text-sm font-bold px-2 py-0.5 bg-transparent focus:outline-none w-28 ${
                    checked
                      ? activity.blanks[i].answers.some((a) => a.toLowerCase().trim() === answers[i].toLowerCase().trim())
                        ? 'border-green-500 text-green-700'
                        : 'border-red-400 text-red-600'
                      : 'border-teal text-navy focus:border-navy'
                  }`}
                />
              )}
            </span>
          ))}
        </div>
      </div>
      {checked && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
          {activity.blanks.map((blank, i) => {
            const correct = blank.answers.some((a) => a.toLowerCase().trim() === answers[i].toLowerCase().trim());
            return !correct ? (
              <p key={i} className="text-sm text-mid">
                Blank {i + 1}: <span className="font-bold text-navy">{blank.answers[0]}</span>
              </p>
            ) : null;
          })}
        </motion.div>
      )}
      <div className="flex gap-2">
        {!checked && (
          <button
            onClick={check}
            disabled={answers.some((a) => !a.trim())}
            className="btn-primary text-sm py-2 disabled:opacity-40"
          >
            Check answers
          </button>
        )}
        {checked && <button onClick={reset} className="btn-outline text-sm py-2">Try again</button>}
      </div>
    </div>
  );
}
