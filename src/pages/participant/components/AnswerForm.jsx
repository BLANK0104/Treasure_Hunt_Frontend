import React from 'react';
import { motion } from 'framer-motion';

const AnswerForm = ({
  textAnswer,
  onTextChange,
  onImageChange,
  imagePreview,
  requiresImage,
  submitting,
  onSubmit,
  error,
  success
}) => {
  return (
    <motion.form 
      onSubmit={onSubmit} 
      className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-cyan-300 mb-2">
          Text Answer *
        </label>
        <textarea
          value={textAnswer}
          onChange={onTextChange}
          className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-white focus:ring-cyan-500 focus:border-cyan-500"
          rows="4"
          placeholder="Enter your answer here..."
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-medium text-cyan-300 mb-2">
          Upload Image {requiresImage && '*'}
          <span className="text-sm text-gray-400 ml-2">(Optional unless marked with *)</span>
        </label>
        <input
          type="file"
          onChange={onImageChange}
          accept="image/*"
          className="w-full border border-gray-700 rounded-md p-2 shadow-sm bg-gray-800 text-white focus:ring-cyan-500 focus:border-cyan-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
          required={requiresImage}
        />
        {imagePreview && (
          <motion.div 
            className="mt-3 border border-cyan-400 rounded-lg p-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm font-medium text-cyan-300 mb-2">Preview:</p>
            <img 
              src={imagePreview}
              alt="Answer Preview" 
              className="max-w-full h-auto max-h-60 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            />
          </motion.div>
        )}
      </motion.div>

      <motion.button
        type="submit"
        disabled={submitting}
        className={`w-full py-3 px-4 rounded-md text-black font-medium transition-all transform
          ${submitting 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 hover:scale-105 hover:shadow-lg'
          }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: submitting ? 1 : 1.05 }}
        whileTap={{ scale: submitting ? 1 : 0.95 }}
      >
        {submitting ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Submitting...
          </div>
        ) : (
          'Submit Answer'
        )}
      </motion.button>

      {error && (
        <motion.div
          className="text-red-500 text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          className="text-green-500 text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {success}
        </motion.div>
      )}
    </motion.form>
  );
};

export default AnswerForm;