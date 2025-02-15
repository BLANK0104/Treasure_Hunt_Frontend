import { useState, useEffect } from 'react';
import { getTeamAnswers, reviewAnswer } from '../../../services/api';

const TeamPanel = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const response = await getTeamAnswers();
    if (response.success) {
      setTeams(response.teams);
    }
    setLoading(false);
  };

  const handleReview = async (teamId, isAccepted) => {
    const response = await reviewAnswer(teamId, isAccepted);
    if (response.success) {
      fetchTeams();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Team Submissions</h2>
      
      <div className="space-y-6">
        {teams.map((team) => (
          <div key={team.id} className="border rounded p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{team.team_member_name}</h3>
                <p className="text-sm text-gray-600">Question: {team.question}</p>
                <p className="mt-2">{team.text_answer}</p>
                {team.image_answer_url && (
                  <img
                    src={team.image_answer_url}
                    alt="Answer submission"
                    className="mt-2 max-w-xs rounded"
                  />
                )}
              </div>
              
              {!team.is_reviewed && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleReview(team.id, true)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReview(team.id, false)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPanel;