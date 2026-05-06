import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ReflectionActivity({ activity, onComplete }) {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    if (text.trim().length < 10) return;
    setSubmitted(true);
    onComplete && onComplete(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 card-cream">
        <span className="text-2xl">💭</span>
        <p className="text-navy font-semibold leading-relaxed">{activity.prompt}</p>
      </div>
      {activity.hints && (
        <div className="space-y-1">
          <p className="text-xs font-bold text-mid uppercase tracking-wide">Some things to think about:</p>
          {activity.hints.map((h, i) => (
            <p key={i} className="text-sm text-mid flex items-start gap-2">
              <span className="text-teal mt-0.5">→</span>{h}
            </p>
          ))}
        </div>
      )}
      {!submitted ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Write your reflection here... there's no right or wrong answer."
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal resize-none"
          />
          <button
            onClick={submit}
            disabled={text.trim().length < 10}
            className="btn-primary text-sm py-2 disabled:opacity-40"
          >
            Submit reflection ✓
          </button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-teal/10 border border-teal rounded-xl p-4"
        >
          <p className="font-bold text-teal mb-2">✅ Great reflection!</p>
          <p className="text-sm text-navy italic">"{text}"</p>
          {activity.followUp && (
            <p className="text-sm text-mid mt-3 border-t border-teal/20 pt-3">{activity.followUp}</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
