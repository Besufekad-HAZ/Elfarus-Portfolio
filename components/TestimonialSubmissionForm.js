import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { FaUpload, FaUser, FaQuoteLeft, FaTimes } from 'react-icons/fa';

const TestimonialSubmissionForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    message: '',
    avatar: null
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_MESSAGE_LENGTH = 300;
  const MAX_NAME_LENGTH = 50;
  const MAX_POSITION_LENGTH = 30;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Apply character limits
    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) {
      newValue = value.slice(0, MAX_MESSAGE_LENGTH);
    } else if (name === 'name' && value.length > MAX_NAME_LENGTH) {
      newValue = value.slice(0, MAX_NAME_LENGTH);
    } else if (name === 'position' && value.length > MAX_POSITION_LENGTH) {
      newValue = value.slice(0, MAX_POSITION_LENGTH);
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          avatar: 'Please select an image file'
        }));
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          avatar: 'Image size should be less than 2MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        avatar: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      setErrors(prev => ({
        ...prev,
        avatar: ''
      }));
    }
  };

  const removeAvatar = () => {
    setFormData(prev => ({
      ...prev,
      avatar: null
    }));
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Testimonial message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message should be at least 20 characters';
    }

    if (!formData.avatar) {
      newErrors.avatar = 'Avatar image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        name: '',
        position: '',
        message: '',
        avatar: null
      });
      setAvatarPreview(null);
      setErrors({});
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-primary/95 backdrop-blur-sm rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Submit Your Testimonial</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              Your Photo (Circular Avatar)
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                {avatarPreview ? (
                  <>
                    <Image
                      src={avatarPreview}
                      alt="Avatar preview"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover border-2 border-accent"
                    />
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center bg-white/5">
                    <FaUser className="w-8 h-8 text-white/50" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg cursor-pointer transition-colors"
                >
                  <FaUpload className="w-4 h-4" />
                  <span className="text-sm">Upload Photo</span>
                </label>
              </div>
            </div>
            {errors.avatar && (
              <p className="text-red-400 text-xs">{errors.avatar}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
              placeholder="Enter your full name"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>{errors.name && <span className="text-red-400">{errors.name}</span>}</span>
              <span>{formData.name.length}/{MAX_NAME_LENGTH}</span>
            </div>
          </div>

          {/* Position */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              Your Position/Role
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g., Customer, Client, Partner"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>{errors.position && <span className="text-red-400">{errors.position}</span>}</span>
              <span>{formData.position.length}/{MAX_POSITION_LENGTH}</span>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              Your Testimonial
            </label>
            <div className="relative">
              <FaQuoteLeft className="absolute top-3 left-3 text-white/30 w-4 h-4" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Share your experience working with Elfarus..."
              />
            </div>
            <div className="flex justify-between text-xs text-white/60">
              <span>{errors.message && <span className="text-red-400">{errors.message}</span>}</span>
              <span>{formData.message.length}/{MAX_MESSAGE_LENGTH}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-accent hover:bg-accent/80 disabled:bg-accent/50 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </button>
        </form>

        {/* Info Text */}
        <p className="text-xs text-white/60 mt-4 text-center">
          Your testimonial will be reviewed and may be featured on our testimonials page.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialSubmissionForm;
