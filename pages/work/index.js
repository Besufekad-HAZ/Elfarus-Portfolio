// components
import WorkSlider from "../../components/WorkSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <div className="min-h-screen bg-primary/30 py-24 md:py-36 flex items-center">
      <Circles />
      <div className="container mx-auto mt-12 pt-10 lg:mt-0 lg:pt-2">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* text */}
          <motion.div className="text-center flex flex-col xl:w-[30vw] xl:text-left mb-8 xl:mb-0">
            <motion.h2
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-12"
            >
              My Works <span className="text-accent">.</span>{" "}
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto text-white"
            >
              Boost your brand&#39;s visual impact with my videography and
              editing services. From corporate videos and promo reels to event
              coverage and post-production, I bring your ideas to life with
              attention to every detail and a personalized touch.
            </motion.p>
          </motion.div>
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            {/* slider */}
            <WorkSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Work;
