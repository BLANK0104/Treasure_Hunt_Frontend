import { useState, useEffect } from 'react';
import { getTeamResults } from '../../../services/api';

const ResultPanel = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const formatTime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTeamResults();
      
      if (response.success) {
        setResults(response.results);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-300">Team Results</h2>
      
      {results.length === 0 ? (
        <div className="text-gray-500 bg-white p-4 rounded-lg shadow">
          No results available. Teams need to submit and get answers approved to appear here.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions Solved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Submission</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result, index) => (
                <tr 
                  key={result.username} 
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } ${
                    index < 3 ? 'font-semibold' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{result.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{result.total_points}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {result.normal_solved} + {result.bonus_solved} bonus
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {formatTime(result.total_time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    {result.last_submission_time || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultPanel;