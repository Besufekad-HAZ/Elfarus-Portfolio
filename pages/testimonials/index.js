// components
import TestimonialSlider from "../../components/TestimonialSlider";
import TestimonialSubmissionForm from "../../components/TestimonialSubmissionForm";

// import framer motion
import { motion } from "framer-motion";

// import variants
import { fadeIn } from "../../variants";

// import icons
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const Testimonials = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

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
        avatar: avatarBase64
      };

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Thank you for your testimonial! It will be reviewed and may be featured on our page.');
        setShowSubmissionForm(false);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('There was an error submitting your testimonial. Please try again.');
    }
  };

  return (
    <div className="h-[105vh] bg-primary/30 py-32 text-center">
      <div className="container mx-auto h-full flex flex-col justify-center">
        {/* title  */}
        <motion.h2
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 text-[30px] mt-5 sm:text-3xl lg:text-4xl mb-8 xl:mb-0"
        >
          What clients <span className="text-accent">say.</span>
        </motion.h2>

        {/* Submit Testimonial Button */}
        <motion.div
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-8"
        >
          <button
            onClick={() => setShowSubmissionForm(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-accent hover:bg-accent/80 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
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
      </div>
    </div>
  );
};
export default Testimonials;
