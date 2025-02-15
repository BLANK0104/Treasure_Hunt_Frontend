import { useState, useEffect } from 'react';
import { getCurrentQuestion, submitAnswer } from '../../services/api';
import QuestionDisplay from './components/QuestionDisplay';
import AnswerForm from './components/AnswerForm';
import ErrorAlert from './components/Alert/ErrorAlert';
import SuccessAlert from './components/Alert/SuccessAlert';

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
      
      if (response.success) {
        if (response.completed) {
          setCurrentQuestion({ completed: true });
        } else {
          setCurrentQuestion(response.question);
        }
      } else {
        setError(response.message || 'Failed to fetch question');
      }
    } catch (err) {
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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Current Question</h2>
      
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
  );
};

export default Participant;