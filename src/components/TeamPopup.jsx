import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const TeamPopup = ({ team, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!team) return null;
  const { solvedQuestions } = team;
  const currentQuestion = solvedQuestions[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < solvedQuestions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md w-full relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={onClose}>
          <FiX size={24} />
        </button>

        <h3 className="text-lg font-bold mb-2">{currentQuestion.question}</h3>
        <p className="text-sm mb-4">{currentQuestion.answer}</p>
        {currentQuestion.image && <img src={currentQuestion.image} alt="Answer" className="w-full rounded-lg" />}

        <div className="flex justify-between mt-4">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 disabled:opacity-50">
            <FiChevronLeft size={24} />
          </button>
          <button onClick={handleNext} disabled={currentIndex === solvedQuestions.length - 1} className="p-2 disabled:opacity-50">
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamPopup;
