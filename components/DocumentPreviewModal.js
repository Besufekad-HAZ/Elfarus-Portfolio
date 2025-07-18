import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoDownload, IoChevronBack, IoChevronForward, IoExpand, IoContract } from 'react-icons/io5';
import Image from 'next/image';

const DocumentPreviewModal = ({ isOpen, onClose, project, currentDocumentIndex = 0 }) => {
  const [currentDocIndex, setCurrentDocIndex] = useState(currentDocumentIndex);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentDocument = project?.documents?.[currentDocIndex];
  const totalDocuments = project?.documents?.length || 0;

  const handlePrevious = useCallback(() => {
    setCurrentDocIndex(prev => (prev > 0 ? prev - 1 : totalDocuments - 1));
    setZoom(1);
  }, [totalDocuments]);

  const handleNext = useCallback(() => {
    setCurrentDocIndex(prev => (prev < totalDocuments - 1 ? prev + 1 : 0));
    setZoom(1);
  }, [totalDocuments]);

  const handleZoomIn = useCallback(() => setZoom(prev => Math.min(prev + 0.25, 3)), []);
  const handleZoomOut = useCallback(() => setZoom(prev => Math.max(prev - 0.25, 0.5)), []);
  const handleResetZoom = useCallback(() => setZoom(1), []);

  const handleDownload = useCallback(() => {
    if (!currentDocument) return;
    const link = document.createElement('a');
    link.href = currentDocument.file;
    link.download = `${project.title}-${currentDocument.title}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentDocument, project?.title]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  }, [onClose, handlePrevious, handleNext]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  // Early return after all hooks
  if (!isOpen || !project || !currentDocument) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative bg-white rounded-lg shadow-2xl ${
              isFullscreen ? 'w-full h-full' : 'w-[95%] max-w-6xl h-[90%] max-h-[800px]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
                <p className="text-sm text-gray-600">{currentDocument.title}</p>
              </div>

              {/* Document Navigation */}
              <div className="flex items-center gap-2 mr-4">
                <button
                  onClick={handlePrevious}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title="Previous document"
                >
                  <IoChevronBack className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600">
                  {currentDocIndex + 1} / {totalDocuments}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title="Next document"
                >
                  <IoChevronForward className="w-5 h-5" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2 mr-4">
                <button
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title="Zoom out"
                >
                  <IoContract className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600 min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title="Zoom in"
                >
                  <IoExpand className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title="Download document"
                >
                  <IoDownload className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  title="Close"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Document Viewer */}
            <div className="flex-1 overflow-hidden">
              {currentDocument.type === 'pdf' ? (
                <div className="w-full h-full">
                  <iframe
                    src={`${currentDocument.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="w-full h-full border-0"
                    title={currentDocument.title}
                  />
                </div>
              ) : currentDocument.type === 'image' ? (
                <div className="w-full h-full overflow-auto bg-gray-100 flex items-center justify-center">
                  <Image
                    src={currentDocument.file}
                    alt={currentDocument.title}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain"
                    style={{ transform: `scale(${zoom})` }}
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">Document preview not available</p>
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Download Document
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Project Info Footer */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Client:</span>
                  <span className="ml-2 text-gray-600">{project.client}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Duration:</span>
                  <span className="ml-2 text-gray-600">{project.duration}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Tools:</span>
                  <span className="ml-2 text-gray-600">{project.tools.join(', ')}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="font-semibold text-gray-700">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DocumentPreviewModal;
