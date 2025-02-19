import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCurrentQuestion, submitAnswer } from '../../services/api';
import QuestionDisplay from './components/QuestionDisplay';
import AnswerForm from './components/AnswerForm';
import ErrorAlert from './components/Alert/ErrorAlert';
import SuccessAlert from './components/Alert/SuccessAlert';

// Aurora effect component
const AuroraEffect = () => (
  <motion.div 
    className="fixed inset-0 z-[-1] opacity-40 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ duration: 1 }}
  >
    <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]" 
      style={{
        background: `
          radial-gradient(circle at center, transparent 0%, #0a0a0a 70%),
          linear-gradient(45deg, rgba(0,255,255,0.1) 0%, transparent 70%),
          linear-gradient(135deg, rgba(0,255,255,0.1) 0%, transparent 70%)
        `,
        animation: 'aurora 15s infinite linear'
      }}
    />
  </motion.div>
);

// Starfield component
const StarField = () => (
  <motion.div 
    className="fixed inset-0 z-[-2] overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    style={{
      background: `
        radial-gradient(circle at center, rgba(0,50,50,0.1) 0%, rgba(10,10,10,1) 100%),
        radial-gradient(circle at 20% 80%, rgba(0,255,255,0.05) 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, rgba(0,255,255,0.05) 0%, transparent 40%),
        #0a0a0a
      `
    }}
  />
);

// Add this CSS to your global styles or create a new style block
const globalStyles = `
  @keyframes aurora {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  
  .celebration-icon {
    animation: float 3s ease-in-out infinite;
  }
`;

const Participant = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [totalEstimatedQuestions, setTotalEstimatedQuestions] = useState(5); // Default estimate

  useEffect(() => {
    fetchCurrentQuestion();
    
    // Try to get the answered questions count from localStorage
    const storedAnsweredCount = localStorage.getItem('answeredQuestionsCount');
    if (storedAnsweredCount) {
      setAnsweredQuestions(parseInt(storedAnsweredCount));
      setQuestionNumber(parseInt(storedAnsweredCount) + 1);
    }
  }, []);

  const fetchCurrentQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCurrentQuestion();
      console.log('Current question response:', response); // Debug log
      
      if (response.success && response.question) {
        setCurrentQuestion({
          id: response.question.id,
          question: response.question.question || response.question.text, // Handle both property names
          points: response.question.points || 0,
          requires_image: Boolean(response.question.requires_image),
          image_url: response.question.image_url || null
        });
        
        // If the API response includes question number info, use it
        if (response.question_number && response.total_questions) {
          setQuestionNumber(response.question_number);
          setTotalEstimatedQuestions(response.total_questions);
        }
      } else if (response.completed) {
        setCurrentQuestion({ completed: true });
      } else {
        setError(response.message || 'No question available');
      }
    } catch (err) {
      console.error('Error fetching question:', err);
      setError('Failed to fetch question');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        e.target.value = '';
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        e.target.value = '';
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setError(null); // Clear any previous errors
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentQuestion?.id) {
      setError('No question to submit answer for');
      return;
    }

    if (currentQuestion.requires_image && !image) {
      setError('This question requires an image');
      return;
    }

    if (!textAnswer.trim() && !image) {
      setError('Please provide either a text answer or an image');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess('');

    try {
      const formData = new FormData();
      if (textAnswer.trim()) {
        formData.append('text_answer', textAnswer.trim());
      }
      if (image) {
        formData.append('image', image);
      }

      const response = await submitAnswer(currentQuestion.id, formData);
      console.log('Submit response:', response); // Debug log
      
      if (response.success) {
        setSuccess('Answer submitted successfully!');
        setTextAnswer('');
        setImage(null);
        setImagePreview(null);
        
        // Update question counters
        const newAnsweredCount = answeredQuestions + 1;
        setAnsweredQuestions(newAnsweredCount);
        setQuestionNumber(newAnsweredCount + 1);
        
        // Store count in localStorage for persistence
        localStorage.setItem('answeredQuestionsCount', newAnsweredCount.toString());
        
        // Fetch next question after a short delay
        setTimeout(() => {
          setSuccess('');
          fetchCurrentQuestion();
        }, 1500);
      } else {
        setError(response.message || 'Failed to submit answer');
      }
    } catch (err) {
      console.error('Error submitting answer:', err);
      setError('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (currentQuestion?.completed) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden">
        <style>{globalStyles}</style>
        <StarField />
        <AuroraEffect />
        
        {/* Enhanced celebration animations */}
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, -Math.random() * 500], 
              x: Math.random() * 10 - 5
            }}
            transition={{ 
              duration: Math.random() * 2 + 1, 
              repeat: Infinity, 
              delay: Math.random() * 5
            }}
            style={{ 
              bottom: '0', 
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#FF9900', '#FF5E5E', '#54E346', '#29CDFF', '#AB7DF6'][Math.floor(Math.random() * 5)]
            }}
          />
        ))}
        
        <motion.div 
          className="max-w-3xl w-full mx-auto p-8 relative z-10 bg-gradient-to-br from-black/70 to-indigo-900/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent mb-6">
              Mission Complete! 🚀
            </h2>
            
            <div className="flex justify-center mb-8 space-x-8">
              <div className="celebration-icon text-6xl">🏆</div>
              <div className="celebration-icon text-6xl" style={{ animationDelay: "0.5s" }}>✨</div>
              <div className="celebration-icon text-6xl" style={{ animationDelay: "1s" }}>🎯</div>
            </div>
            
            <p className="text-xl text-cyan-100 mb-6">
              Congratulations! You've successfully completed all your assigned questions.
            </p>
            
            <motion.div 
              className="p-4 bg-indigo-900/50 rounded-lg border border-indigo-500/30 mb-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-indigo-200">
                Your answers have been submitted and will be reviewed by our team. Thank you for your participation!
              </p>
            </motion.div>
            
            <motion.button
              className="py-3 px-6 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full text-white font-semibold shadow-lg hover:shadow-cyan-500/20 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/dashboard'}
            >
              Return to Dashboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden">
      <style>{globalStyles}</style>
      <StarField />
      <AuroraEffect />
      
      {/* Existing star particles effect */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full shadow-xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 3 }}
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        />
      ))}

      <div className="max-w-2xl w-full mx-auto p-6 relative z-10">
        {/* Question number display */}
        <div className="mb-4 flex justify-between items-center">
          <div className="text-cyan-400 font-medium">
            Question {questionNumber} of {totalEstimatedQuestions}
          </div>
          <div className="w-48 bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full" 
              style={{ width: `${(questionNumber / totalEstimatedQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      
        <h2 className="text-2xl font-bold mb-6 text-cyan-300 text-center animate-pulse">
          Current Question
        </h2>
        <QuestionDisplay 
          question={currentQuestion?.question}
          points={currentQuestion?.points}
          requiresImage={currentQuestion?.requires_image}
          imageUrl={currentQuestion?.image_url}
          apiUrl={import.meta.env.VITE_API_URL}
        />
        <AnswerForm 
          textAnswer={textAnswer}
          onTextChange={(e) => setTextAnswer(e.target.value)}
          onImageChange={handleImageChange}
          imagePreview={imagePreview}
          requiresImage={currentQuestion?.requires_image}
          submitting={submitting}
          onSubmit={handleSubmit}
        />
        <ErrorAlert message={error} />
        <SuccessAlert message={success} />
      </div>
    </div>
  );
};

export default Participant;