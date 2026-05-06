import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

function FeedbackDisplay({ feedback }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card border-l-4 border-teal space-y-3"
    >
      <h4 className="font-extrabold text-navy">AI coach feedback</h4>
      <div
        className="text-sm text-mid leading-relaxed prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html: feedback
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-navy">$1</strong>')
            .replace(/\n/g, '<br />'),
        }}
      />
    </motion.div>
  );
}

export default function InterviewCoach({ questions }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const q = questions[currentQ];

  async function getFeedback() {
    const answer = answers[currentQ];
    if (!answer?.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/chat', {
        messages: [
          {
            role: 'user',
            content: `Interview question: "${q.question}"\n\nMy answer: "${answer}"`,
          },
        ],
        mode: 'interview',
      });
      setFeedbacks((prev) => ({ ...prev, [currentQ]: data.content }));
    } catch (err) {
      setError(err.response?.data?.error || 'AI Coach is taking a break — try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Question nav */}
      <div className="flex gap-2">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${
              i === currentQ
                ? 'bg-navy text-white'
                : feedbacks[i]
                ? 'bg-teal/20 text-teal'
                : 'bg-gray-100 text-mid hover:bg-mint'
            }`}
          >
            Q{i + 1} {feedbacks[i] ? '✓' : ''}
          </button>
        ))}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          className="space-y-4"
        >
          <div className="card-cream">
            <p className="text-xs font-bold text-mid uppercase tracking-wide mb-1">Interview question {currentQ + 1}</p>
            <p className="font-extrabold text-navy text-lg">{q.question}</p>
            <p className="text-sm text-mid mt-2">💡 {q.hint}</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-navy mb-2">Your answer:</label>
            <textarea
              value={answers[currentQ] || ''}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [currentQ]: e.target.value }))}
              rows={5}
              placeholder="Type your answer here — there's no rush. Think about a real example you could use..."
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal resize-none leading-relaxed"
            />
          </div>

          <button
            onClick={getFeedback}
            disabled={!answers[currentQ]?.trim() || loading}
            className="btn-primary disabled:opacity-40"
          >
            {loading ? 'Getting feedback...' : 'Get AI feedback 🤖'}
          </button>

          {error && (
            <p className="text-sm text-coral bg-red-50 rounded-xl px-4 py-3">{error}</p>
          )}

          {feedbacks[currentQ] && <FeedbackDisplay feedback={feedbacks[currentQ]} />}

          {/* Navigation */}
          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCurrentQ((q) => q - 1)}
              disabled={currentQ === 0}
              className="btn-outline py-2 px-4 text-sm disabled:opacity-30"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentQ((q) => q + 1)}
              disabled={currentQ === questions.length - 1}
              className="btn-primary py-2 px-4 text-sm disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
