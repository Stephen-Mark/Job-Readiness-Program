import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import useProgress from '../hooks/useProgress';
import Scenario from '../components/Scenario';
import Quiz from '../components/Quiz';
import BadgeDisplay from '../components/BadgeDisplay';
import AICoach from '../components/AICoach';
import InterviewCoach from '../components/InterviewCoach';
import SkillsAssessment from '../components/SkillsAssessment';
import PriorityActivity from '../components/PriorityActivity';
import ConceptSection from '../components/ConceptSection';
import conceptData from '../data/conceptData';

const TABS = [
  { id: 'learn', label: '📖 Learn' },
  { id: 'activity', label: '🎬 Activity' },
  { id: 'quiz', label: '✏️ Quiz' },
];

export default function ModulePage() {
  const { id } = useParams();
  const moduleId = parseInt(id, 10);
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('learn');
  const [quizDone, setQuizDone] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [quizPassed, setQuizPassed] = useState(null);

  const { markStarted, markCompleted, saveQuizScore, getModuleProgress } = useProgress();
  const modProgress = getModuleProgress(moduleId);
  const [completedConcepts, setCompletedConcepts] = useState(new Set());
  const concepts = conceptData[moduleId] || [];

  function handleConceptComplete(i) {
    setCompletedConcepts((prev) => new Set([...prev, i]));
  }

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/modules/${id}`)
      .then((r) => {
        setModule(r.data);
        markStarted(moduleId);
      })
      .catch(() => setError('Could not load this module — please try again.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setActiveTab('learn');
    setQuizDone(false);
    setQuizScore(null);
    setQuizPassed(null);
    setCompletedConcepts(new Set());
  }, [id]);

  function handleQuizComplete(score, passed) {
    setQuizScore(score);
    setQuizPassed(passed);
    setQuizDone(true);
    saveQuizScore(moduleId, score, passed);
  }

  function handleCompleteModule() {
    markCompleted(moduleId);
    navigate('/progress');
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !module) return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <p className="text-coral font-bold">{error || 'Module not found.'}</p>
      <Link to="/modules" className="btn-outline mt-4 inline-block">← Back to modules</Link>
    </div>
  );

  const prevId = moduleId > 1 ? moduleId - 1 : null;
  const nextId = moduleId < 8 ? moduleId + 1 : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-mid mb-6">
        <Link to="/modules" className="hover:text-teal font-semibold transition-colors">Modules</Link>
        <span>›</span>
        <span className="text-navy font-bold">Module {module.id}</span>
      </div>

      {/* Module header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start gap-4">
          <span className="text-5xl leading-none">{module.icon}</span>
          <div>
            <p className="text-sm font-bold text-teal uppercase tracking-wide mb-1">Module {module.id} · {module.estimatedTime}</p>
            <h1 className="text-3xl font-extrabold text-navy leading-tight">{module.title}</h1>
            <p className="text-mid mt-2 leading-relaxed">{module.description}</p>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex gap-2 mt-4">
          {modProgress.completed && (
            <span className="badge-pill bg-teal/10 text-teal">✅ Completed</span>
          )}
          {modProgress.badgeEarned && (
            <span className="badge-pill bg-amber/20 text-amber-700">🏅 Badge earned</span>
          )}
          {modProgress.quizScore && (
            <span className="badge-pill bg-gray-100 text-mid">Quiz: {modProgress.quizScore}%</span>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-max px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-navy text-white shadow-sm'
                : 'text-mid hover:text-navy hover:bg-mint'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* LEARN TAB */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* Objectives */}
            <div className="card">
              <h2 className="section-heading">What you'll learn</h2>
              <ul className="space-y-2">
                {module.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-mid">
                    <span className="text-teal font-bold mt-0.5">✓</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Video placeholder */}
            <div className="rounded-2xl overflow-hidden bg-navy aspect-video flex items-center justify-center shadow-lg">
              <div className="text-center text-white space-y-2">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto hover:bg-white/30 cursor-pointer transition-colors">
                  <span className="text-2xl ml-1">▶</span>
                </div>
                <p className="font-bold text-sm opacity-80">Module {module.id} — {module.title}</p>
                <p className="text-xs opacity-50">Video content coming soon</p>
              </div>
            </div>

            {/* Key concepts */}
            <div className="space-y-4">
              <h2 className="section-heading">Key concepts</h2>
              {concepts.length > 0 ? (
                concepts.map((concept, i) => (
                  <ConceptSection
                    key={i}
                    concept={concept}
                    index={i}
                    isCompleted={completedConcepts.has(i)}
                    onConceptComplete={handleConceptComplete}
                  />
                ))
              ) : (
                module.keyConcepts.map((concept, i) => (
                  <div key={i} className="card border-l-4 border-teal">
                    <h3 className="font-extrabold text-navy mb-2">{concept.title}</h3>
                    <p className="text-sm text-mid leading-relaxed">{concept.body}</p>
                  </div>
                ))
              )}
            </div>

            {/* Download placeholder */}
            <div className="card-cream flex items-center justify-between">
              <div>
                <p className="font-bold text-navy">📄 Module resources</p>
                <p className="text-sm text-mid">Download the PDF summary for this module</p>
              </div>
              <button className="btn-outline text-sm py-2 px-4">
                Download PDF
              </button>
            </div>

            <button
              onClick={() => setActiveTab('activity')}
              className="btn-primary w-full"
            >
              Next: Activity →
            </button>
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === 'activity' && (
          <div className="space-y-6">
            <Scenario scenario={module.scenario} />

            {/* Module-specific activities */}
            {module.hasSkillsAssessment && (
              <div className="card space-y-4">
                <h2 className="section-heading">Skills self-assessment</h2>
                <SkillsAssessment assessment={module.skillsAssessment} />
              </div>
            )}

            {module.hasPriorityActivity && (
              <div className="card space-y-4">
                <h2 className="section-heading">Priority sorting activity</h2>
                <PriorityActivity />
              </div>
            )}

            {module.hasInterviewCoach && (
              <div className="card space-y-4">
                <h2 className="section-heading">🎤 Practice interviews</h2>
                <p className="text-sm text-mid">Type your answer to each question and your AI coach will give you personalised feedback.</p>
                <InterviewCoach questions={module.interviewQuestions} />
              </div>
            )}

            <button
              onClick={() => setActiveTab('quiz')}
              className="btn-primary w-full"
            >
              Next: Knowledge check →
            </button>
          </div>
        )}

        {/* QUIZ TAB */}
        {activeTab === 'quiz' && (
          <div className="card space-y-6">
            {!quizDone ? (
              <>
                <div>
                  <h2 className="section-heading">Knowledge check</h2>
                  <p className="text-sm text-mid">Score 70% or more to earn your module badge. You can retake this as many times as you need.</p>
                </div>
                <Quiz
                  questions={module.quiz}
                  onComplete={handleQuizComplete}
                  moduleId={moduleId}
                />
              </>
            ) : (
              <BadgeDisplay
                badge={module.badge}
                score={quizScore}
                passed={quizPassed}
                onContinue={quizPassed ? handleCompleteModule : () => {
                  setQuizDone(false);
                  setQuizScore(null);
                  setActiveTab('learn');
                }}
              />
            )}
          </div>
        )}
      </motion.div>

      {/* Module navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
        {prevId ? (
          <Link to={`/modules/${prevId}`} className="btn-outline text-sm py-2 px-4">
            ← Module {prevId}
          </Link>
        ) : <div />}
        {nextId ? (
          <Link to={`/modules/${nextId}`} className="btn-secondary text-sm py-2 px-4">
            Module {nextId} →
          </Link>
        ) : (
          <Link to="/progress" className="btn-primary text-sm py-2 px-4">
            View my progress →
          </Link>
        )}
      </div>

      {/* AI Coach (floating) */}
      <AICoach
        moduleTitle={module.title}
        moduleContext={module.keyConcepts?.map((c) => c.title).join(', ')}
      />
    </div>
  );
}
