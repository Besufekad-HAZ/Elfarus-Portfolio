'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudArrowUpIcon, DocumentIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createUploadWidget, createDocumentObject, loadCloudinaryScript } from '../utils/cloudinary';

const FileUploader = ({ onUploadComplete, category = 'designs' }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState('');
  const [cloudinaryLoaded, setCloudinaryLoaded] = useState(false);
  const widgetRef = useRef(null);

  // Load Cloudinary script on component mount
  useEffect(() => {
    loadCloudinaryScript()
      .then(() => {
        setCloudinaryLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to load Cloudinary:', error);
        setError('Failed to load Cloudinary. Please refresh the page.');
      });
  }, []);

  // Handle upload success
  const handleUploadSuccess = (result) => {


    setUploading(false);
    setProgress(0);

    // Check if result exists and has the expected structure
    if (result && result.event === 'success' && result.info) {
      const document = createDocumentObject(result.info, result.info.original_filename);

      // Add to uploaded files
      setUploadedFiles(prev => [...prev, document]);

      // Call completion callback
      if (onUploadComplete) {
        onUploadComplete(document);
      }
    } else if (result && result.event === 'error') {
      setError('Upload failed: ' + (result.error?.message || 'Unknown error'));
    } else {
      setError('Upload completed but result format is unexpected');
    }
  };

  // Handle upload error
  const handleUploadError = (error) => {
    setUploading(false);
    setProgress(0);
    setError('Upload failed: ' + error.message);
  };

  // Open upload widget
  const openUploadWidget = () => {
    if (!cloudinaryLoaded) {
      setError('Cloudinary is still loading. Please wait a moment.');
      return;
    }

    setError('');
    setUploading(true);
    setProgress(10);

    try {
      const widget = createUploadWidget(handleUploadSuccess, {
        folder: category,
        maxFileSize: 50000000, // 50MB
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'],
        sources: ['local', 'camera'],
        multiple: false,
        showAdvancedOptions: false,
        cropping: false,
        showSkipCropButton: true,
        showUploadMoreButton: false,
        resourceType: 'auto',
        // Add error handling
        onError: (error) => {
          console.error('Upload widget error:', error);
          setError('Upload widget error: ' + (error.message || 'Unknown error'));
          setUploading(false);
          setProgress(0);
        }
      });

      if (widget) {
        widgetRef.current = widget;
        widget.open();
      } else {
        setError('Failed to create upload widget');
        setUploading(false);
      }
    } catch (error) {
      console.error('Error creating upload widget:', error);
      setError('Failed to create upload widget: ' + error.message);
      setUploading(false);
    }
  };

  // Remove uploaded file
  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Get file icon
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <DocumentIcon className="w-8 h-8 text-red-400" />;
      case 'image':
        return <PhotoIcon className="w-8 h-8 text-blue-400" />;
      default:
        return <DocumentIcon className="w-8 h-8 text-white/60" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:border-accent/50 hover:bg-white/5"
      >
        <div className="space-y-6">
          {uploading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4"></div>
                <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
              </div>
              <p className="text-lg font-medium text-white">Uploading...</p>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-accent h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
              <p className="text-sm text-white/60">{progress}% complete</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <CloudArrowUpIcon className="w-20 h-20 text-white/40 mx-auto mb-4" />
              <p className="text-xl font-medium text-white mb-2">
                Upload your design file
              </p>
              <p className="text-white/60 mb-6">
                Click the button below to open the upload widget
              </p>
              <button
                onClick={openUploadWidget}
                disabled={!cloudinaryLoaded}
                className={`px-8 py-4 rounded-lg font-medium transition-all duration-300 ${
                  cloudinaryLoaded
                    ? 'bg-accent text-white hover:bg-accent/80 hover:scale-105 shadow-lg shadow-accent/25'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                {cloudinaryLoaded ? 'Open Upload Widget' : 'Loading Cloudinary...'}
              </button>
              <div className="text-sm text-white/40 space-y-1 mt-6">
                <p>Supports: JPG, PNG, GIF, WebP, PDF</p>
                <p>Maximum size: 50MB</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Files */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-white">Uploaded Files</h3>
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-medium text-white">{file.title}</p>
                    <p className="text-sm text-white/60">
                      {file.size} • {file.dimensions}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-white/40 hover:text-red-400 transition-colors p-2 hover:bg-white/5 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-accent/10 border border-accent/20 rounded-lg p-6"
      >
        <h4 className="font-medium text-accent mb-4">Upload Guidelines</h4>
        <ul className="text-sm text-white/70 space-y-2">
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span><strong>Posters:</strong> 2480x3508px (A4) or 1920x1080px, max 10MB</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span><strong>Thumbnails:</strong> 1280x720px (16:9), max 2MB</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span><strong>Banners:</strong> 1920x1080px, max 5MB</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span><strong>Magazines:</strong> PDF format, max 20MB</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span><strong>Others:</strong> Variable size, max 15MB</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default FileUploader;
