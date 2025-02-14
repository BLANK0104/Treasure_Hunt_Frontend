import { Link } from "react-router-dom";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Compass, Scroll, Map, ChevronRight, ChevronLeft, Lock, Check, X } from "lucide-react";

// Pre-registered teams and their access codes
const validCredentials = {
  "Team Chronos": "CHRONO2024",
  "Team Quantum": "QUANTUM2024",
  "Team Tardis": "TARDIS2024",
  "Team Voyager": "VOYAGE2024",
};

// Complete question set
const questions = [
  {
    id: 1,
    image: "/api/placeholder/800/400",
    question: "What year did the first temporal anomaly appear in the Ancient Library of Alexandria?",
    riddle: "In halls of scrolls where wisdom sleeps,\nA flash of light through time now leaps.",
    answer: "48 BC",
    hint: "The year Julius Caesar accidentally set fire to the library",
    points: 100,
  },
  // Add more questions...
];

const ParticipantPage = () => {
  const [teamName, setTeamName] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (validCredentials[teamName] === accessCode) {
      setIsRegistered(true);
      setError("");
    } else {
      setError("Invalid team name or access code. Please try again.");
    }
  };

  const handleAnswerSubmit = (questionId, answer) => {
    const question = questions[currentQuestion];
    const isCorrect = answer.toLowerCase() === question.answer.toLowerCase();

    setAnswers({
      ...answers,
      [questionId]: { answer, isCorrect, submitted: true },
    });

    if (isCorrect) {
      setScore((prev) => prev + question.points);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowHint(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setShowHint(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Temporal Treasure Hunt
      </motion.h1>

      {!isRegistered ? (
        <motion.form onSubmit={handleRegister} className="max-w-md mx-auto space-y-6">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full bg-transparent border-2 border-blue-500 rounded-lg p-3"
            placeholder="Enter Team Name"
            required
          />
          <input
            type="password"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full bg-transparent border-2 border-blue-500 rounded-lg p-3"
            placeholder="Enter Access Code"
            required
          />
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="w-full bg-transparent border-2 border-blue-500 rounded-lg p-3"
            placeholder="Enter Participant Name"
            required
          />
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 p-3 rounded-lg font-bold">
            Begin Journey
          </button>
        </motion.form>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion} className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-400">Score: {score} points</span>
              <span className="text-purple-400">{teamName} - {participantName}</span>
            </div>

            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="text-blue-400">Question {currentQuestion + 1}/{questions.length}</div>
                <div className="text-purple-400">Worth {questions[currentQuestion].points} points</div>
              </div>

              <motion.img
                src={questions[currentQuestion].image}
                alt="Question Image"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <h2 className="text-2xl font-bold text-blue-300">{questions[currentQuestion].question}</h2>
              <p className="text-purple-300 italic">{questions[currentQuestion].riddle}</p>

              {!answers[questions[currentQuestion].id]?.submitted ? (
                <div>
                  <input
                    type="text"
                    className="w-full bg-black/50 border-2 border-blue-500 rounded-lg p-3"
                    placeholder="Enter your answer..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAnswerSubmit(questions[currentQuestion].id, e.target.value);
                      }
                    }}
                  />
                  <button onClick={() => setShowHint(!showHint)} className="text-blue-400 text-sm">
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </button>
                  {showHint && <div className="text-gray-400 text-sm italic">Hint: {questions[currentQuestion].hint}</div>}
                </div>
              ) : (
                <div className={`text-lg ${answers[questions[currentQuestion].id].isCorrect ? "text-green-500" : "text-red-500"}`}>
                  {answers[questions[currentQuestion].id].isCorrect ? "Correct!" : "Incorrect!"}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={prevQuestion} className="px-4 py-2 bg-blue-600 rounded-lg" disabled={currentQuestion === 0}>
                Previous
              </button>
              <button onClick={nextQuestion} className="px-4 py-2 bg-purple-600 rounded-lg" disabled={currentQuestion === questions.length - 1}>
                Next
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ParticipantPage;
