import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoDownload, IoChevronBack, IoChevronForward, IoExpand, IoContract } from 'react-icons/io5';
import OptimizedImage from './OptimizedImage';
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
    // Reset image transform for new document
    setTimeout(() => {
      const img = document.querySelector('.document-preview-image');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    }, 100);
  }, [totalDocuments]);

  const handleNext = useCallback(() => {
    setCurrentDocIndex(prev => (prev < totalDocuments - 1 ? prev + 1 : 0));
    setZoom(1);
    // Reset image transform for new document
    setTimeout(() => {
      const img = document.querySelector('.document-preview-image');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    }, 100);
  }, [totalDocuments]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => {
      const newZoom = Math.min(prev + 0.25, 5);
      // Update image transform if it exists
      const img = document.querySelector('.document-preview-image');
      if (img) {
        const currentTransform = img.style.transform;
        const baseScale = currentTransform.includes('scale(') ?
          parseFloat(currentTransform.match(/scale\(([^)]+)\)/)?.[1] || 1) : 1;
        const newScale = baseScale * (newZoom / prev);
        img.style.transform = currentTransform.replace(/scale\([^)]+\)/, `scale(${newScale})`);
      }
      return newZoom;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.25, 0.5);
      // Update image transform if it exists
      const img = document.querySelector('.document-preview-image');
      if (img) {
        const currentTransform = img.style.transform;
        const baseScale = currentTransform.includes('scale(') ?
          parseFloat(currentTransform.match(/scale\(([^)]+)\)/)?.[1] || 1) : 1;
        const newScale = baseScale * (newZoom / prev);
        img.style.transform = currentTransform.replace(/scale\([^)]+\)/, `scale(${newScale})`);
      }
      return newZoom;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    // Reset image transform
    const img = document.querySelector('.document-preview-image');
    if (img) {
      const currentTransform = img.style.transform;
      const baseScale = currentTransform.includes('scale(') ?
        parseFloat(currentTransform.match(/scale\(([^)]+)\)/)?.[1] || 1) : 1;
      img.style.transform = currentTransform.replace(/scale\([^)]+\)/, `scale(${baseScale})`);
    }
  }, []);

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
            className={`relative bg-white rounded-lg shadow-2xl flex flex-col ${
              isFullscreen ? 'w-full h-full' : 'w-[98%] max-w-7xl h-[95%] max-h-[95vh]'
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
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-md"
                  title="Previous document"
                >
                  <IoChevronBack className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  {currentDocIndex + 1} / {totalDocuments}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-md"
                  title="Next document"
                >
                  <IoChevronForward className="w-5 h-5" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2 mr-4">
                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full transition-colors shadow-md"
                  title="Zoom out"
                >
                  <IoContract className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-700 font-medium min-w-[60px] text-center bg-white px-2 py-1 rounded border">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full transition-colors shadow-md"
                  title="Zoom in"
                >
                  <IoExpand className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors shadow-md font-medium"
                >
                  Reset
                </button>
                {zoom > 1 && (
                  <span className="text-xs text-gray-500 ml-2 bg-yellow-100 px-2 py-1 rounded">
                    Scroll to navigate
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors shadow-md"
                  title="Download document"
                >
                  <IoDownload className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-md"
                  title="Close"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Document Viewer */}
            <div className="flex-1 overflow-hidden min-h-0">

              {currentDocument.type === 'pdf' ? (
                <div className="w-full h-full">
                  <iframe
                    src={`${currentDocument.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="w-full h-full border-0"
                    title={currentDocument.title}
                  />
                </div>
                                          ) : currentDocument.type === 'image' ? (
                <div className="w-full h-full overflow-auto bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
                      {/* Try main file first, then preview as fallback */}
                      <Image
                        src={currentDocument.file}
                        alt={currentDocument.title}
                        className="document-preview-image w-auto h-auto max-w-[98%] max-h-[98%] object-contain transition-transform duration-200 shadow-lg"
                        style={{
                          transform: `scale(${zoom})`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease-in-out',
                          minWidth: '300px',
                          minHeight: '200px'
                        }}
                        width={800}
                        height={600}
                        onLoadingComplete={(img) => {
                          img.style.opacity = '1';
                          // For smaller images (thumbnails, banners), scale them up appropriately
                          const naturalWidth = img.naturalWidth;
                          const naturalHeight = img.naturalHeight;
                          const containerWidth = img.parentElement.clientWidth;
                          const containerHeight = img.parentElement.clientHeight;

                          // If image is smaller than container, scale it up
                          if (naturalWidth < containerWidth * 0.8 || naturalHeight < containerHeight * 0.8) {
                            const scaleX = (containerWidth * 0.8) / naturalWidth;
                            const scaleY = (containerHeight * 0.8) / naturalHeight;
                            const scale = Math.min(scaleX, scaleY, 3); // Max scale of 3x
                            img.style.transform = `scale(${scale * zoom})`;
                          }
                        }}
                        onError={(e) => {
                          console.error('Error loading main image:', currentDocument.file);
                          // Try preview URL as fallback
                          if (currentDocument.preview && currentDocument.preview !== currentDocument.file) {
                            console.log('Trying preview URL as fallback:', currentDocument.preview);
                            e.target.src = currentDocument.preview;
                          } else {
                            // Show error message
                            e.target.style.display = 'none';
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'text-center text-gray-600';
                            errorDiv.innerHTML = `
                              <div class="mb-4">
                                <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                              <p class="text-lg font-medium mb-2">Image not available</p>
                              <p class="text-sm">The image could not be loaded.</p>
                              <button onclick="window.open('${currentDocument.file}', '_blank')" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                Open Image in New Tab
                              </button>
                            `;
                            e.target.parentNode.appendChild(errorDiv);
                          }
                        }}
                        unoptimized
                        priority
                      />
                    </div>
                  </div>
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
