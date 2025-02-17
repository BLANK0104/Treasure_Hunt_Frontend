import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-lg shadow-lg p-6 border border-cyan-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-cyan-300">No question available</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-lg shadow-lg p-6 mb-6 border border-cyan-500"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-xl font-semibold mb-4 text-cyan-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {question}
      </motion.h2>

      <motion.p 
        className="text-cyan-400 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Points: {points || 0}
      </motion.p>
      
      {requiresImage && (
        <motion.p 
          className="text-cyan-300 text-sm mb-4 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          * This question requires an image in the answer
        </motion.p>
      )}

      {imageUrl && (
        <motion.div 
          className="mt-4 border border-cyan-400 rounded-lg p-3"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm font-medium text-cyan-300 mb-2">Question Image:</p>
          <img
            src={getImageUrl(imageUrl)}
            alt="Question"
            className="max-w-full h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              const errorDiv = document.createElement('div');
              errorDiv.className = 'text-red-500 text-sm mt-2';
              errorDiv.textContent = 'Failed to load image';
              e.target.parentElement.appendChild(errorDiv);
            }}
          />
        </motion.div>
      )}
    </motion.div>
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