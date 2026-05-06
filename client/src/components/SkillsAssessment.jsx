import { useState } from 'react';
import { motion } from 'framer-motion';

const CAREER_LABELS = {
  healthcare: '🏥 Healthcare',
  education: '📚 Education',
  'social-work': '🤝 Community & Social Work',
  design: '🎨 Design & Creative',
  arts: '🎭 Arts & Media',
  architecture: '🏛️ Architecture',
  IT: '💻 IT & Technology',
  engineering: '⚙️ Engineering',
  data: '📊 Data & Analytics',
  trades: '🔧 Trades',
  agriculture: '🌿 Agriculture',
  construction: '🏗️ Construction',
  finance: '💰 Finance & Accounting',
  accounting: '📑 Accounting',
  sales: '📣 Sales & Marketing',
  teaching: '👩‍🏫 Teaching',
  law: '⚖️ Law',
  media: '📺 Media & Communications',
  veterinary: '🐾 Veterinary & Animal Care',
  'environmental-science': '🌍 Environmental Science',
  hospitality: '☕ Hospitality',
  culinary: '👨‍🍳 Culinary Arts',
  nutrition: '🥗 Nutrition & Dietetics',
  'project-management': '📋 Project Management',
  business: '💼 Business',
  logistics: '🚛 Logistics & Supply Chain',
  'sports-coaching': '⚽ Sports Coaching',
  physio: '🏃 Physiotherapy',
  'personal-training': '💪 Personal Training',
};

export default function SkillsAssessment({ assessment }) {
  const [selected, setSelected] = useState(new Set());
  const [showResults, setShowResults] = useState(false);

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function getCareerMatches() {
    const counts = {};
    assessment.skills.forEach((skill) => {
      if (selected.has(skill.id)) {
        skill.categories.forEach((cat) => {
          counts[cat] = (counts[cat] || 0) + 1;
        });
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([cat, count]) => ({ cat, count, label: CAREER_LABELS[cat] || cat }));
  }

  const matches = getCareerMatches();

  return (
    <div className="space-y-4">
      <p className="text-mid text-sm">{assessment.prompt}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {assessment.skills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => toggle(skill.id)}
            className={`text-left border-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              selected.has(skill.id)
                ? 'border-teal bg-mint text-navy'
                : 'border-gray-200 bg-white text-mid hover:border-teal'
            }`}
          >
            <span className="mr-2">{selected.has(skill.id) ? '✅' : '⬜'}</span>
            {skill.label}
          </button>
        ))}
      </div>

      {selected.size >= 2 && !showResults && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowResults(true)}
          className="btn-primary"
        >
          See my career matches →
        </motion.button>
      )}

      {showResults && matches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card border-l-4 border-teal"
        >
          <h4 className="font-extrabold text-navy mb-3">Your top career areas</h4>
          <div className="space-y-2">
            {matches.map(({ cat, label, count }) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-sm font-bold w-40">{label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / selected.size) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-mid mt-4">
            These are suggestions based on your selections — not limits! Career pathways are about exploration, not boxes.
          </p>
          <button
            onClick={() => { setShowResults(false); setSelected(new Set()); }}
            className="mt-3 text-sm text-teal font-bold hover:underline"
          >
            Start over
          </button>
        </motion.div>
      )}
    </div>
  );
}
