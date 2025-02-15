import React from 'react';

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
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Answer *
        </label>
        <textarea
          value={textAnswer}
          onChange={onTextChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          placeholder="Enter your answer here..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image {requiresImage && '*'}
          <span className="text-sm text-gray-500 ml-2">(Optional unless marked with *)</span>
        </label>
        <input
          type="file"
          onChange={onImageChange}
          accept="image/*"
          className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required={requiresImage}
        />
        {imagePreview && (
          <div className="mt-3 border rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <img 
              src={imagePreview}
              alt="Answer Preview" 
              className="max-w-full h-auto max-h-60 rounded-lg shadow-sm"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors
          ${submitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
      >
        {submitting ? 'Submitting...' : 'Submit Answer'}
      </button>
    </form>
  );
};

export default AnswerForm;