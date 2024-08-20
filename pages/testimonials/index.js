// components
import TestimonialSlider from "../../components/TestimonialSlider";

// import framer motion
import { motion } from "framer-motion";

// import variants
import { fadeIn } from "../../variants";

const Testimonials = () => {
  return (
    <div className="h-full bg-primary/30 py-32 text-center">
      <div className="container mx-auto h-full flex flex-col justify-center">
        {/* title  */}
        <motion.h2 variants={fade} className="h2 mb-8 xl:mb-0">
          What clients <span className="text-accent">say.</span>
        </motion.h2>

        {/* slider */}
        <div>
          <TestimonialSlider />
        </div>
      </div>
    </div>
  );
};
export default Testimonials;
