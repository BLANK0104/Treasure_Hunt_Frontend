import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BonusQuestionHandler = ({ 
  questionNumber, 
  onSwitchToBonus, 
  onSwitchToNormal, 
  isBonusMode,
  bonusCompleted
}) => {
  const [showBonusButton, setShowBonusButton] = useState(false);

  useEffect(() => {
    // Show bonus button at questions 15, 30, 45, etc.
    const shouldShowBonus = questionNumber % 15 === 0 && !bonusCompleted;
    setShowBonusButton(shouldShowBonus);
  }, [questionNumber, bonusCompleted]);

  if (!showBonusButton && !isBonusMode) return null;

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {showBonusButton && !isBonusMode && (
        <motion.button
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:shadow-purple-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSwitchToBonus}
        >
          Take Bonus Question! (100 points)
        </motion.button>
      )}
      {isBonusMode && (
        <motion.button
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold shadow-lg hover:shadow-blue-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSwitchToNormal}
        >
          Return to Normal Questions
        </motion.button>
      )}
    </div>
  );
};

export default BonusQuestionHandler;