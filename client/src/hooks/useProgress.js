import { useState, useCallback } from 'react';

const STORAGE_KEY = 'wrp_progress';

const defaultProgress = () => ({
  modules: {},
  lastUpdated: null,
});

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, lastUpdated: new Date().toISOString() }));
  } catch {
    // localStorage unavailable — silently fail
  }
}

export default function useProgress() {
  const [progress, setProgress] = useState(load);

  const updateModule = useCallback((moduleId, updates) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...prev.modules[moduleId],
            ...updates,
          },
        },
      };
      save(next);
      return next;
    });
  }, []);

  const markStarted = useCallback((moduleId) => {
    setProgress((prev) => {
      if (prev.modules[moduleId]?.started) return prev;
      const next = {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...prev.modules[moduleId],
            started: true,
            startedAt: new Date().toISOString(),
          },
        },
      };
      save(next);
      return next;
    });
  }, []);

  const markCompleted = useCallback((moduleId) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...prev.modules[moduleId],
            started: true,
            completed: true,
            completedAt: new Date().toISOString(),
          },
        },
      };
      save(next);
      return next;
    });
  }, []);

  const saveQuizScore = useCallback((moduleId, score, passed) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...prev.modules[moduleId],
            quizScore: score,
            quizPassed: passed,
            badgeEarned: passed,
            quizCompletedAt: new Date().toISOString(),
          },
        },
      };
      save(next);
      return next;
    });
  }, []);

  const getModuleProgress = useCallback((moduleId) => {
    return progress.modules[moduleId] || {};
  }, [progress]);

  const getOverallProgress = useCallback(() => {
    const total = 8;
    const completed = Object.values(progress.modules).filter((m) => m.completed).length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  }, [progress]);

  const getLastIncompleteModule = useCallback(() => {
    for (let i = 1; i <= 8; i++) {
      if (!progress.modules[i]?.completed) return i;
    }
    return null;
  }, [progress]);

  const resetProgress = useCallback(() => {
    const fresh = defaultProgress();
    save(fresh);
    setProgress(fresh);
  }, []);

  return {
    progress,
    markStarted,
    markCompleted,
    saveQuizScore,
    updateModule,
    getModuleProgress,
    getOverallProgress,
    getLastIncompleteModule,
    resetProgress,
  };
}
