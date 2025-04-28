// next image
import Image from "next/image";

// components
import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";

// framer motion
import { motion } from "framer-motion";

// variants
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 min-h-screen overflow-x-hidden">
      {/* Header with logo and social icons */}

      {/* Main Content */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10 pt-36 sm:pt-40 md:pt-20">
        <div className="text-center flex flex-col justify-center xl:pt-20 xl:text-left h-full container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title with responsive spacing */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 text-[28px] leading-tight md:text-[40px] lg:text-[60px] mt-0 md:mt-6 lg:mt-0"
          >
            <span className="block md:inline">Transforming Ideas</span>{" "}
            <br className="hidden md:block" />
            Into{" "}
            <span className="text-accent block md:inline mt-2 md:mt-0">
              Digital Reality
            </span>
          </motion.h1>

          {/* Rest of your content remains the same */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[90%] md:max-w-[80%] lg:max-w-xl mx-auto xl:mx-0 my-6 lg:my-10 text-base md:text-lg text-left md:text-justify"
          >
            Elevate your brand&apos;s visual presence with captivating videos
            that connect, inspire, and engage your audience. As a versatile
            videographer and video editor, I bring your ideas to life with
            cinematic storytelling and unparalleled technical expertise!
          </motion.p>

          {/* Button Container */}
          <div className="flex flex-col items-start space-y-4 md:space-y-6">
            {/* Changed from items-center to items-start */}
            <div className="flex xl:hidden">
              <ProjectsBtn />
            </div>
            <motion.div
              variants={fadeIn("down", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="hidden xl:flex"
            >
              <ProjectsBtn />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Section - remains the same */}
      <div className="w-full h-full absolute right-0 bottom-0 overflow-hidden pointer-events-none ">
        {/* Background Image */}
        <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0" />

        {/* Particles */}
        <ParticlesContainer />

        {/* Avatar Image */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-[300px] max-h-[300px] sm:max-w-[400px] sm:max-h-[400px] md:max-w-[500px] md:max-h-[500px] lg:max-w-[737px] lg:max-h-[678px] absolute -bottom-20 sm:-bottom-32 lg:bottom-0 lg:right-[8%]"
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
