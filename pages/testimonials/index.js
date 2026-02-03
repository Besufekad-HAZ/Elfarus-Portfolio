// components
import TestimonialSlider from "../../components/TestimonialSlider";
import TestimonialSubmissionForm from "../../components/TestimonialSubmissionForm";
import ConfirmationModal from "../../components/ConfirmationModal";

// import framer motion
import { motion } from "framer-motion";

// import variants
import { fadeIn } from "../../variants";

// import icons
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const Testimonials = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTestimonialSubmit = async (formData) => {
    try {
      // Convert avatar file to base64 for API submission
      const avatarBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(formData.avatar);
      });

      const submissionData = {
        ...formData,
        avatar: avatarBase64,
      };

      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const result = await response.json();
        setShowSubmissionForm(false);
        setShowSuccessModal(true);
        // Trigger refresh of testimonial slider
        setRefreshKey((prev) => prev + 1);
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "An error occurred");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setErrorMessage(
        "There was an error submitting your testimonial. Please try again."
      );
      setShowErrorModal(true);
    }
  };

  return (
    <div className="min-h-[100vh] bg-primary/30 pt-28 sm:pt-32 md:pt-32 lg:pt-28 xl:pt-24 pb-16 sm:pb-20 text-center">
      <div className="container mx-auto h-full flex flex-col px-4">
        {/* title  */}
        <motion.h2
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 text-[24px] sm:text-[30px] md:text-3xl lg:text-4xl mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-2"
        >
          What clients <span className="text-accent">say.</span>
        </motion.h2>

        {/* Submit Testimonial Button */}
        <motion.div
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <button
            onClick={() => setShowSubmissionForm(true)}
            className="inline-flex items-center space-x-2 px-4 sm:px-6 py-3 bg-accent hover:bg-accent/80 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <FaPlus className="w-4 h-4" />
            <span>Share Your Experience</span>
          </button>
        </motion.div>

        {/* slider */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          key={refreshKey}
        >
          <TestimonialSlider />
        </motion.div>

        {/* Testimonial Submission Form */}
        {showSubmissionForm && (
          <TestimonialSubmissionForm
            onSubmit={handleTestimonialSubmit}
            onClose={() => setShowSubmissionForm(false)}
          />
        )}

        {/* Success Modal */}
        <ConfirmationModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          type="success"
          title="Thank You!"
          message="Thank you for your testimonial! It will be reviewed and may be featured on our page."
        />

        {/* Error Modal */}
        <ConfirmationModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          type="success"
          title="Error"
          message={errorMessage}
        />
      </div>
    </div>
  );
};
export default Testimonials;
