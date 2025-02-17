import React from 'react';
import PropTypes from 'prop-types';

const QuestionDisplay = ({ question, points, requiresImage, imageUrl, apiUrl }) => {
  console.log('Image URL debug:', { imageUrl, apiUrl }); // Debug log

  const getImageUrl = (url) => {
    if (!url) return '';
    
    // Remove /api/ from the API URL if present
    const baseUrl = apiUrl.replace('/api', '').replace(/\/$/, '');
    // Clean up the image path
    const cleanPath = url.replace(/^\/+/, '');
    
    const fullUrl = `${baseUrl}/${cleanPath}`;
    return fullUrl;
  };

  if (!question) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">No question available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <p className="text-gray-600 mb-4">Points: {points || 0}</p>
      
      {requiresImage && (
        <p className="text-blue-600 text-sm mb-4">
          * This question requires an image in the answer
        </p>
      )}

      {imageUrl && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Question Image:</p>
          <img
            src={getImageUrl(imageUrl)}
            alt="Question"
            className="max-w-full h-auto rounded-lg shadow-sm"
            onError={(e) => {
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
  );
};

QuestionDisplay.propTypes = {
  question: PropTypes.string,
  points: PropTypes.number,
  requiresImage: PropTypes.bool,
  imageUrl: PropTypes.string,
  apiUrl: PropTypes.string.isRequired
};

QuestionDisplay.defaultProps = {
  question: '',
  points: 0,
  requiresImage: false,
  imageUrl: null
};

export default QuestionDisplay;