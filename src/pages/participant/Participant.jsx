import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCurrentQuestion, submitAnswer } from '../../services/api';
import QuestionDisplay from './components/QuestionDisplay';
import AnswerForm from './components/AnswerForm';
import ErrorAlert from './components/Alert/ErrorAlert';
import SuccessAlert from './components/Alert/SuccessAlert';

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

  useEffect(() => {
    fetchCurrentQuestion();
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
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Congratulations! 🎉
        </h2>
        <p className="text-xl text-gray-700">
          You have completed all your assigned questions.
        </p>
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