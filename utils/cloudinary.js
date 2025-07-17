// Client-side Cloudinary utilities for Next.js

// Generate Cloudinary upload widget
export const createUploadWidget = (callback, options = {}) => {
  if (typeof window === 'undefined') return null;

  const defaultOptions = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
    folder: options.folder || 'designs',
    resourceType: 'auto',
    maxFileSize: 50000000, // 50MB
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'],
    ...options
  };

  // Create a wrapper callback to handle errors
  const wrappedCallback = (error, result) => {
    if (error) {
      console.error('Cloudinary upload error:', error);
      callback({ event: 'error', error });
      return;
    }

    if (result) {
      callback(result);
    } else {
      callback({ event: 'error', error: { message: 'No result received from upload' } });
    }
  };

  return window.cloudinary.createUploadWidget(defaultOptions, wrappedCallback);
};

// Generate preview URL
export const getPreviewUrl = (url, width = 400) => {
  if (!url) return '';
  return url.replace('/upload/', `/upload/c_scale,w_${width}/`);
};

// Generate optimized URL for different sizes
export const getOptimizedUrl = (url, options = {}) => {
  if (!url) return '';

  const { width, height, quality = 'auto:good', format = 'auto' } = options;
  let transformation = `c_scale`;

  if (width && height) {
    transformation = `c_fill,w_${width},h_${height}`;
  } else if (width) {
    transformation = `c_scale,w_${width}`;
  } else if (height) {
    transformation = `c_scale,h_${height}`;
  }

  return url.replace('/upload/', `/upload/${transformation},q_${quality},f_${format}/`);
};

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Extract file info from Cloudinary result
export const extractFileInfo = (result) => {
  return {
    url: result.secure_url,
    public_id: result.public_id,
    size: result.bytes,
    format: result.format,
    width: result.width,
    height: result.height,
    created_at: result.created_at
  };
};

// Create document object from upload result
export const createDocumentObject = (result, originalName) => {
  const fileInfo = extractFileInfo(result);

  return {
    type: fileInfo.format === 'pdf' ? 'pdf' : 'image',
    title: originalName ? originalName.replace(/\.[^/.]+$/, '') : fileInfo.public_id.split('/').pop(),
    file: fileInfo.url,
    preview: getPreviewUrl(fileInfo.url, 400),
    size: formatFileSize(fileInfo.size),
    dimensions: fileInfo.width && fileInfo.height ? `${fileInfo.width}x${fileInfo.height}px` : 'Auto-detected',
    public_id: fileInfo.public_id
  };
};

// Load Cloudinary script
export const loadCloudinaryScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Cloudinary script can only be loaded in browser'));
      return;
    }

    if (window.cloudinary) {
      resolve(window.cloudinary);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    script.onload = () => resolve(window.cloudinary);
    script.onerror = () => reject(new Error('Failed to load Cloudinary script'));
    document.head.appendChild(script);
  });
};

export default {
  createUploadWidget,
  getPreviewUrl,
  getOptimizedUrl,
  formatFileSize,
  extractFileInfo,
  createDocumentObject,
  loadCloudinaryScript
};
