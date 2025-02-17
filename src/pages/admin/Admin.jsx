import { useState } from 'react';
import QuestionPanel from './components/QuestionPanel';
import TeamPanel from './components/TeamPanel';
import ResultPanel from './components/ResultPanel';
import ViewQuestions from './components/ViewQuestions';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('questions');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-4" aria-label="Tabs">
            {['questions', 'view questions', 'teams', 'results'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-black'
                    : 'bg-black text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'questions' && <QuestionPanel />}
          {activeTab === 'view questions' && <ViewQuestions />}
          {activeTab === 'teams' && <TeamPanel />}
          {activeTab === 'results' && <ResultPanel />}
        </div>
      </div>
    </div>
  );
};

export default Admin;