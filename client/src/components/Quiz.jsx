import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Quiz({ questions, onComplete, moduleId }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const total = questions.length;
  const PASS_THRESHOLD = 0.7;

  function handleSelect(optionIndex) {
    if (selected !== null) return;
    setSelected(optionIndex);
    setShowExplanation(true);
    setAnswers((prev) => [...prev, { questionId: q.id, selected: optionIndex, correct: optionIndex === q.correct }]);
  }

  function handleNext() {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      const correctCount = [...answers, { correct: selected === q.correct }].filter((a) => a.correct).length;
      const score = Math.round((correctCount / total) * 100);
      const passed = correctCount / total >= PASS_THRESHOLD;
      onComplete(score, passed);
    }
  }

  if (finished) return null;

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-mid">Question {current + 1} of {total}</span>
        <div className="flex-1 progress-bar-track h-2">
          <div className="progress-bar-fill h-2" style={{ width: `${((current) / total) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-lg font-bold text-navy mb-4">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((option, i) => {
              let classes = 'quiz-option';
              if (selected !== null) {
                if (i === q.correct) classes += ' correct';
                else if (i === selected && selected !== q.correct) classes += ' incorrect';
              } else if (selected === i) {
                classes += ' selected';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`quiz-option w-full text-left flex items-start gap-3 ${
                    selected !== null && i === q.correct ? 'border-green-500 bg-green-50' : ''
                  } ${
                    selected !== null && i === selected && i !== q.correct ? 'border-coral bg-red-50' : ''
                  } ${selected === null ? 'hover:border-teal hover:bg-mint' : ''} disabled:cursor-default`}
                >
                  <span className={`font-bold shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    selected !== null && i === q.correct ? 'bg-green-500 text-white' :
                    selected !== null && i === selected && i !== q.correct ? 'bg-coral text-white' :
                    'bg-gray-100 text-mid'
                  }`}>{optionLabels[i]}</span>
                  <span className="text-sm">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-4 p-4 rounded-xl text-sm ${
                  selected === q.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <p className="font-bold mb-1">
                  {selected === q.correct ? '✅ Spot on!' : '🤔 Not quite right'}
                </p>
                <p className="text-mid">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Next button */}
      {selected !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={handleNext} className="btn-primary w-full sm:w-auto">
            {current < total - 1 ? 'Next question →' : 'See my results'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
