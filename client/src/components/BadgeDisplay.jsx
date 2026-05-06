import { motion } from 'framer-motion';

export default function BadgeDisplay({ badge, score, passed, onContinue }) {
  return (
    <div className="text-center space-y-6 py-8">
      {passed ? (
        <>
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="inline-flex flex-col items-center"
          >
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-5xl shadow-xl mb-3"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${badge.color}44, ${badge.color}22)`,
                border: `4px solid ${badge.color}`,
              }}
            >
              {badge.emoji}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-extrabold text-xl text-navy">{badge.name}</p>
              <p className="text-sm text-mid">Badge earned!</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <p className="text-3xl font-extrabold text-teal">{score}%</p>
            <p className="text-mid">You passed! 🎉 Keep going — you're building something great.</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={onContinue}
            className="btn-primary"
          >
            Mark module complete →
          </motion.button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="text-5xl">💪</div>
          <p className="text-2xl font-extrabold text-navy">You scored {score}%</p>
          <p className="text-mid">You need 70% or more to earn the badge. You've got this — have another look at the content and try again!</p>
          <button onClick={onContinue} className="btn-outline">
            Review and try again
          </button>
        </div>
      )}
    </div>
  );
}
