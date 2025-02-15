import React from 'react';

const QuestionDisplay = ({ question, points, requiresImage, imageUrl, apiUrl }) => {
  const getImageUrl = (url) => {
    if (!url) return '';
    // Remove any duplicate '/api' or '/uploads' in the path
    const cleanUrl = url.replace('/api/uploads/', '/uploads/').replace('/uploads/', '/uploads/');
    return `${apiUrl}${cleanUrl}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <p className="text-lg mb-3">{question}</p>
      <p className="text-sm text-gray-600 mb-2">Points: {points}</p>
      
      {requiresImage && (
        <p className="text-sm text-blue-600 font-medium">
          * This question requires an image answer
        </p>
      )}

      {imageUrl && (
        <div className="mt-4 border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Question Image:</p>
          <img 
            src={getImageUrl(imageUrl)}
            alt="Question"
            className="max-w-full h-auto rounded-lg shadow-sm"
            onError={(e) => {
              const failedUrl = e.target.src;
              console.error('Image load error for:', failedUrl);
              e.target.style.display = 'none';
              const container = e.target.parentNode;
              
              // Add error message
              const errorDiv = document.createElement('div');
              errorDiv.className = 'text-red-500 text-sm mt-2';
              errorDiv.textContent = 'Failed to load question image';
              container.appendChild(errorDiv);
              
              // Add debug info
              const debugDiv = document.createElement('div');
              debugDiv.className = 'text-xs text-gray-500 mt-1';
              debugDiv.textContent = `Debug: ${failedUrl}`;
              container.appendChild(debugDiv);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;