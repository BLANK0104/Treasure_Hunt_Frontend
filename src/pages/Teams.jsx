import { useState } from "react";
import { teamsData } from "../teams/mockTeams";
import TeamPopup from "../components/TeamPopup";

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div className="w-[90vw] max-w-[900px] min-h-screen mx-auto flex">
      <div className="flex flex-1 flex-col items-center justify-self-start text-center p-6 pt-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-purple-300 mb-4">Teams</h2>

        {/* Team List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {teamsData.map((team) => (
            <div
              key={team.id}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all w-full"
              onClick={() => setSelectedTeam(team)}
            >
              <h3 className="text-lg font-semibold text-purple-400">{team.name}</h3>
              <p className="text-gray-400 text-sm">{team.solvedQuestions.length} Questions Solved</p>
            </div>
          ))}
        </div>

        {/* Team Popup */}
        {selectedTeam && <TeamPopup team={selectedTeam} onClose={() => setSelectedTeam(null)} />}
      </div>
    </div>
  );
};

export default Teams;
