import { useState, useEffect } from 'react';
import { getTeams, getTeamAnswers, reviewAnswer } from '../../../services/api';

const TeamPanel = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamAnswers, setTeamAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTeams();
      
      if (response.success) {
        console.log('Teams fetched:', response.teams); // Debug log
        setTeams(response.teams);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch teams');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    // Remove any leading slashes and ensure single /uploads/
    const cleanPath = url.startsWith('/') ? url.substring(1) : url;
    // Remove /api/ from API URL if present and any trailing slashes
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '').replace(/\/$/, '');
    
    const fullUrl = `${baseUrl}/${cleanPath}`;
    console.log('Generated image URL:', fullUrl); // Debug log
    return fullUrl;
  };

  const fetchTeamAnswers = async (username) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTeamAnswers(username);
      
      if (response.success) {
        console.log('Team answers fetched:', response.answers); // Debug log
        setTeamAnswers(response.answers);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch team answers');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    fetchTeamAnswers(team.username);
  };

  const handleReview = async (answerId, isAccepted) => {
    try {
      setError(null);
      const response = await reviewAnswer(selectedTeam.username, answerId, isAccepted);
      
      if (response.success) {
        // Refresh answers after review
        fetchTeamAnswers(selectedTeam.username);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to review answer');
      console.error('Error:', err);
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
    <div className="flex gap-6 p-6">
      {/* Teams List */}
      <div className="w-1/3 border-r pr-6">
        <h2 className="text-2xl font-semibold mb-4">Teams</h2>
        {teams.length === 0 ? (
          <div className="text-gray-500">No teams found</div>
        ) : (
          <div className="space-y-2">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => handleTeamClick(team)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedTeam?.id === team.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{team.username}</div>
                <div className="text-sm text-gray-600">
                  Total Points: {team.total_points || 0}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Team Answers */}
      <div className="w-2/3">
        {selectedTeam ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              {selectedTeam.username}'s Answers
            </h2>
            <div className="space-y-6">
              {teamAnswers.map((answer) => (
                <div key={answer.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-medium">Question {answer.question_number}</h3>
                      <p className="text-gray-600">{answer.question_text}</p>
                      <p className="text-sm text-blue-600">Points: {answer.points}</p>
                      
                      <div className="mt-4">
                        <p className="font-medium">Answer:</p>
                        <p className="mt-1">{answer.text_answer}</p>
                        
                        {answer.image_answer_url && (
    <div className="mt-2">
      <img
        src={getImageUrl(answer.image_answer_url)}
        alt="Answer submission"
        className="max-w-md rounded-lg shadow-sm"
        onError={(e) => {
          console.error('Image load error:', e.target.src);
          e.target.style.display = 'none';
          const errorDiv = document.createElement('div');
          errorDiv.className = 'text-red-500 text-sm mt-2';
          errorDiv.textContent = 'Failed to load image';
          e.target.parentElement.appendChild(errorDiv);
        }}
      />
    </div>
  )}

                      </div>
                    </div>

                    {!answer.is_reviewed && (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleReview(answer.id, true)}
                          className="bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded-lg transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReview(answer.id, false)}
                          className="bg-red-600 hover:bg-red-700 text-black px-4 py-2 rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {answer.is_reviewed && (
                      <div className={`px-3 py-1 rounded-lg ${
                        answer.is_accepted 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {answer.is_accepted ? 'Accepted' : 'Rejected'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-64 text-gray-500">
            Select a team to view their answers
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPanel;