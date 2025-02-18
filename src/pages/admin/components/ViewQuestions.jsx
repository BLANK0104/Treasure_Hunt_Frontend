import { useState, useEffect } from 'react';
import { getAllQuestions } from '../../../services/api';

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_URL.split('/api')[0];


  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();
      if (response.success) {
        console.log('Fetched questions:', response.questions); // Debug log
        setQuestions(response.questions);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading questions...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">All Questions</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {questions.map((question) => (
          <div key={question.id} className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-m text-gray-600">Question: {question.question}</p>
                <p className="text-sm text-gray-600">Points: {question.points}</p>
              </div>
            </div>
            {question.image_url && (
              <div className="mt-4">
                <img
                  src={`${apiBaseUrl}${question.image_url}`}
                  alt={`Question ${question.id}`}
                  className="max-w-full h-auto rounded"
                  onError={(e) => {
                    console.error('Failed to load image:', question.image_url);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default ViewQuestions;
