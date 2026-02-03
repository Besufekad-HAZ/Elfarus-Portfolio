import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const ConfirmationModal = ({
  isOpen,
  onClose,
  type = "success", // 'success' or 'confirm'
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  icon: CustomIcon,
}) => {
  if (!isOpen) return null;

  const isSuccess = type === "success";
  const isConfirm = type === "confirm";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-primary/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-md w-full p-6 md:p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            {CustomIcon ? (
              <CustomIcon className="w-16 h-16 text-accent" />
            ) : isSuccess ? (
              <FaCheckCircle className="w-16 h-16 text-green-400" />
            ) : (
              <FaExclamationTriangle className="w-16 h-16 text-yellow-400" />
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white text-center mb-3">
            {title}
          </h3>

          {/* Message */}
          <p className="text-white/80 text-center mb-6 leading-relaxed">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {isConfirm && (
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors font-medium"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={() => {
                if (onConfirm) {
                  onConfirm();
                } else {
                  onClose();
                }
              }}
              className={`flex-1 px-6 py-3 rounded-lg transition-colors font-medium ${
                isSuccess
                  ? "bg-accent hover:bg-accent/80 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              {isConfirm ? confirmText : "OK"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
