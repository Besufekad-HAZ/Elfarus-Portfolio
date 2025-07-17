'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { designWorkData } from '../data/work/designData';

const DesignWorkSlider = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [previewModal, setPreviewModal] = useState({ isOpen: false, document: null });

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All'
    ? designWorkData.projects
    : designWorkData.projects.filter(project => project.category === selectedCategory);

  const currentProject = filteredProjects[currentProjectIndex];

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentProjectIndex(0);
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentProjectIndex(prev =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentProjectIndex(prev =>
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  // Handle document preview
  const handleDocumentPreview = async (document) => {
    setIsLoading(true);
    setPreviewModal({ isOpen: true, document });

    // Simulate loading time for large files
    if (parseFloat(document.size) > 5) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setIsLoading(false);
  };

  // Close preview modal
  const closePreviewModal = () => {
    setPreviewModal({ isOpen: false, document: null });
  };

  // Format file size for display
  const formatFileSize = (size) => {
    const sizeNum = parseFloat(size);
    if (sizeNum >= 10) {
      return `${sizeNum}MB`;
    } else if (sizeNum >= 1) {
      return `${sizeNum.toFixed(1)}MB`;
    } else {
      return `${(sizeNum * 1024).toFixed(0)}KB`;
    }
  };

  // Get file type icon
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <DocumentIcon className="w-5 h-5" />;
      case 'image':
        return <PhotoIcon className="w-5 h-5" />;
      default:
        return <DocumentIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {designWorkData.categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryChange(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.name
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Project Counter */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          {currentProjectIndex + 1} of {filteredProjects.length} projects
        </p>
      </div>

      {/* Main Project Display */}
      {currentProject && (
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Project Image */}
            <div className="relative">
              <img
                src={currentProject.thumbnail}
                alt={currentProject.title}
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentProject.category}
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentProject.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentProject.description}
                </p>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Client</p>
                  <p className="text-gray-900">{currentProject.client}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-gray-900">{currentProject.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tools</p>
                  <p className="text-gray-900">{currentProject.tools.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <p className="text-gray-900">{currentProject.category}</p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-3">Documents</p>
                <div className="space-y-3">
                  {currentProject.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => handleDocumentPreview(doc)}
                    >
                      <div className="flex items-center space-x-3">
                        {getFileIcon(doc.type)}
                        <div>
                          <p className="font-medium text-gray-900">{doc.title}</p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(doc.size)} • {doc.dimensions}
                          </p>
                        </div>
                      </div>
                      <EyeIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Controls */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={goToPrevious}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex space-x-2">
          {filteredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProjectIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentProjectIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closePreviewModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {previewModal.document?.title}
                  </h3>
                  <button
                    onClick={closePreviewModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formatFileSize(previewModal.document?.size)} • {previewModal.document?.dimensions}
                </p>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading document...</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Large file ({formatFileSize(previewModal.document?.size)}) - please wait
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {previewModal.document?.type === 'pdf' ? (
                      <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <DocumentIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">PDF Document</p>
                        <a
                          href={previewModal.document?.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <DocumentIcon className="w-5 h-5 mr-2" />
                          Open PDF
                        </a>
                      </div>
                    ) : (
                      <img
                        src={previewModal.document?.file}
                        alt={previewModal.document?.title}
                        className="w-full h-auto rounded-lg shadow-lg"
                        onError={(e) => {
                          e.target.src = previewModal.document?.preview || '/placeholder-image.jpg';
                        }}
                      />
                    )}

                    <div className="flex justify-center space-x-4">
                      <a
                        href={previewModal.document?.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <EyeIcon className="w-5 h-5 mr-2" />
                        View Full Size
                      </a>
                      <a
                        href={previewModal.document?.file}
                        download
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <DocumentIcon className="w-5 h-5 mr-2" />
                        Download
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesignWorkSlider;
