import PropTypes from 'prop-types';

const ProgressBar = ({ questionNumber, totalQuestions }) => {
  // Ensure questionNumber is a number and not less than 1
  const currentQuestion = Math.max(1, Number(questionNumber));
  const total = Math.max(1, Number(totalQuestions));
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (currentQuestion / total) * 100);

  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="text-cyan-400 font-medium flex items-center gap-2">
        <span>Question</span>
        <span className="px-3 py-1 bg-cyan-900/50 rounded-lg border border-cyan-500/30">
          {currentQuestion} of {total}
        </span>
      </div>
      <div className="w-48 bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired
};

ProgressBar.defaultProps = {
  questionNumber: 1,
  totalQuestions: 1
};

export default ProgressBar;