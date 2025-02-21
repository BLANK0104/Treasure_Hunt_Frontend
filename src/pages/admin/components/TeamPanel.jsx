import { useState, useEffect } from 'react';
import { getTeams, getTeamAnswers, reviewAnswer } from '../../../services/api';

const TeamPanel = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamAnswers, setTeamAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
        setFilteredTeams(response.teams);
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

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = teams.filter(team => team.username.toLowerCase().includes(query));
    setFilteredTeams(filtered);
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
      <div className="flex justify-center items-center h-64"></div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
      {/* Teams List */}
      <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r pb-4 lg:pb-0 lg:pr-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Teams</h2>
        <input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        {filteredTeams.length === 0 ? (
          <div className="text-gray-500">No teams found</div>
        ) : (
          <div className="space-y-2">
            {filteredTeams.map((team) => (
              <button
                key={team.id}
                onClick={() => handleTeamClick(team)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedTeam?.id === team.id
                    ? 'bg-cyan-100 text-cyan-900'
                    : 'hover:bg-gray-100 text-gray-800'
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
      <div className="w-full lg:w-2/3">
        {selectedTeam ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {selectedTeam.username}'s Answers
            </h2>
            <div className="space-y-4">
              {teamAnswers.map((answer) => (
                <div key={answer.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="space-y-2 w-full md:w-3/4">
                      <h3 className="font-medium text-gray-800">Question {answer.question_number}</h3>
                      <p className="text-gray-600">{answer.question_text}</p>
                      <p className="text-sm text-blue-600">Points: {answer.points}</p>
                      
                      <div className="mt-4">
                        <p className="font-medium text-gray-800">Answer:</p>
                        <p className="mt-1 text-gray-700">{answer.text_answer}</p>
                        
                        {answer.image_answer_url && (
                          <div className="mt-2">
                            <img
                              src={getImageUrl(answer.image_answer_url)}
                              alt="Answer submission"
                              className="w-full max-w-lg rounded-lg shadow-sm object-contain"
                              style={{ maxHeight: '300px' }}
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

                    <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                      {!answer.is_reviewed ? (
                        <>
                          <button
                            onClick={() => handleReview(answer.id, true)}
                            className="flex-1 md:flex-none bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReview(answer.id, false)}
                            className="flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <div className={`text-center px-3 py-1 rounded-lg ${
                          answer.is_accepted 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {answer.is_accepted ? 'Accepted' : 'Rejected'}
                        </div>
                      )}
                    </div>
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