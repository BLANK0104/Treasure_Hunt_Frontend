// ParticipantPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ChevronRight, ChevronLeft, Clock, Compass } from 'lucide-react';

const validCredentials = {
  "Team Chronos": "CHRONO2024",
  "Team Quantum": "QUANTUM2024",
  "Team Tardis": "TARDIS2024",
  "Team Voyager": "VOYAGE2024",
};

const questions = [
  {
    id: 1,
    image: "/api/placeholder/800/400",
    question: "What year did the first temporal anomaly appear in the Ancient Library of Alexandria?",
    riddle: "In halls of scrolls where wisdom sleeps,\nA flash of light through time now leaps.\nBefore the flames claimed ancient lore,\nI slipped through time's mysterious door.",
    answer: "48 BC",
    hint: "The year Julius Caesar accidentally set fire to the library",
    points: 100
  },
  {
    id: 2,
    image: "/api/placeholder/800/400",
    question: "Which future invention caused the Great Time Merge of 2150?",
    riddle: "Quantum crystals shine so bright,\nMerging day into the night.\nWhat device with temporal core,\nMade two timelines become four?",
    answer: "Quantum Harmonic Oscillator",
    hint: "It harmonizes different temporal frequencies",
    points: 150
  },
  // ... other questions remain the same
];

function ParticipantPage() {
  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const handleRegister = (e) => {
    e.preventDefault();
    if (validCredentials[teamName] === accessCode) {
      setIsRegistered(true);
      setError('');
    } else {
      setError('Invalid team name or access code. Please try again.');
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const question = questions[currentQuestion];
    
    // Normalize both answers to lowercase and trim whitespace for comparison
    const normalizedUserAnswer = currentAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = question.answer.toLowerCase();

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      // Add points only if question hasn't been answered before
      if (!answeredQuestions.has(question.id)) {
        setScore(prev => prev + question.points);
        setAnsweredQuestions(prev => new Set([...prev, question.id]));
      }
      // Move to next question automatically after correct answer
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setCurrentAnswer(''); // Clear the answer field
      }
    } else {
      setError('Incorrect answer. Try again!');
      setTimeout(() => setError(''), 2000); // Clear error after 2 seconds
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setCurrentAnswer('');
      setError('');
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setCurrentAnswer('');
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-500">
        Temporal Treasure Hunt
      </h1>

      {!isRegistered ? (
        <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-6">
          {/* Registration form remains the same */}
          <div>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-transparent border-2 border-blue-500 rounded-lg p-3 text-white"
              placeholder="Enter Team Name"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full bg-transparent border-2 border-blue-500 rounded-lg p-3 text-white"
              placeholder="Enter Access Code"
              required
            />
          </div>

          <div>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="w-full bg-transparent border-2 border-blue-500 rounded-lg p-3 text-white"
              placeholder="Enter Participant Name"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 p-3 rounded-lg font-bold hover:bg-blue-700"
          >
            Begin Journey
          </button>

          <div className="text-sm text-center text-gray-400 mt-4">
            Available Teams: {Object.keys(validCredentials).join(", ")}
          </div>
        </form>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Score and Team Info */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-blue-400">Score: {score} points</span>
            <span className="text-purple-400">{teamName} - {participantName}</span>
          </div>

          {/* Question Card */}
          <div className="bg-blue-900/20 p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="text-blue-400" />
                <span className="text-blue-400">Question {currentQuestion + 1}/{questions.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Compass className="text-purple-400" />
                <span className="text-purple-400">Worth {questions[currentQuestion].points} points</span>
              </div>
            </div>

            <img
              src={questions[currentQuestion].image}
              alt="Question Image"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-300">
                {questions[currentQuestion].question}
              </h2>

              <p className="italic text-purple-300">
                {questions[currentQuestion].riddle}
              </p>

              <form onSubmit={handleAnswerSubmit} className="space-y-4">
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  className="w-full bg-black/50 border-2 border-blue-500/50 rounded-lg p-3 text-white"
                  placeholder="Enter your answer..."
                  required
                />

                {error && (
                  <div className="text-red-500 text-center">{error}</div>
                )}

                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
                  >
                    Submit Answer
                  </button>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={prevQuestion}
                      disabled={currentQuestion === 0}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                      <span>Previous</span>
                    </button>

                    <button
                      type="button"
                      onClick={nextQuestion}
                      disabled={currentQuestion === questions.length - 1}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 disabled:opacity-50"
                    >
                      <span>Next</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParticipantPage;
