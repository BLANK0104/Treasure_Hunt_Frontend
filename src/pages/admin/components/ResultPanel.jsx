import { useState, useEffect } from 'react';
import { getTeamResults } from '../../../services/api';

const ResultPanel = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const response = await getTeamResults();
    if (response.success) {
      setResults(response.results);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Team Results</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Team</th>
              <th className="px-6 py-3 text-left">Total Points</th>
              <th className="px-6 py-3 text-left">Questions Solved</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {results.map((result, index) => (
              <tr key={result.id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{result.team_member_name}</td>
                <td className="px-6 py-4">{result.total_points}</td>
                <td className="px-6 py-4">{result.questions_solved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultPanel;