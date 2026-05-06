import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConceptQuiz({ questions, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const total = questions.length;
  const optLabels = ['A', 'B', 'C', 'D'];

  function pick(i) {
    if (selected !== null) return;
    setSelected(i);
    setAnswers((prev) => [...prev, { correct: i === q.correct }]);
  }

  function next() {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setDone(true);
      const correctCount = answers.filter((a) => a.correct).length;
      const score = Math.round((correctCount / total) * 100);
      onComplete && onComplete(score, score >= 70);
    }
  }

  if (done) {
    const correctCount = answers.filter((a) => a.correct).length;
    const score = Math.round((correctCount / total) * 100);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4 space-y-2">
        <p className="text-2xl font-extrabold text-teal">{score}%</p>
        <p className="font-bold text-navy">{correctCount}/{total} correct</p>
        <p className="text-sm text-mid">{score >= 70 ? '✅ Great work — you\'ve got this concept!' : '📖 Review the content above and try again.'}</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-mid">Q{current + 1}/{total}</span>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-teal rounded-full transition-all" style={{ width: `${(current / total) * 100}%` }} />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
          <p className="font-bold text-navy mb-3 text-sm">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={selected !== null}
                className={`w-full text-left flex items-start gap-2 px-3 py-2.5 rounded-xl border-2 text-sm transition-all disabled:cursor-default ${
                  selected === null ? 'border-gray-200 hover:border-teal hover:bg-mint' :
                  i === q.correct ? 'border-green-500 bg-green-50 text-green-800' :
                  i === selected ? 'border-red-400 bg-red-50 text-red-800' :
                  'border-gray-200 opacity-50'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  selected !== null && i === q.correct ? 'bg-green-500 text-white' :
                  selected !== null && i === selected ? 'bg-red-400 text-white' :
                  'bg-gray-100 text-mid'
                }`}>{optLabels[i]}</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
          {selected !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-3 p-3 rounded-xl text-xs font-semibold ${selected === q.correct ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
              {selected === q.correct ? '✅ ' : '💡 '}{q.explanation}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      {selected !== null && (
        <button onClick={next} className="btn-primary text-sm py-2 w-full">
          {current < total - 1 ? 'Next →' : 'Finish concept check'}
        </button>
      )}
    </div>
  );
}
