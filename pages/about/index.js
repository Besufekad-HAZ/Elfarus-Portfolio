import React, { useState } from "react";
import aboutData from "../../data/about/data";

// components
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// counter
import CountUp from "react-countup";

const About = () => {
  const [index, setIndex] = useState(0);
  console.log(index);
  return (
    <div className="min-h-screen bg-primary/30 py-24 md:py-32 text-center xl:text-left">
      <Circles />
      {/* Avatar img */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px] z-0"
      >
        <Avatar />
      </motion.div>
      <div className="container mx-auto mt-12 pt-10 lg:mt-0 lg:pt-2 h-full flex flex-col items-center xl:flex-row gap-x-6 relative">
        {/* text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            Captivating <span className="text-accent">stories</span> birth
            magnificent designs.
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[500px] mx-auto text-justify xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-white"
          >
            My journey into the world of computers began since I was 15 years
            old with gaming, fueling my passion for technology and creativity.
            From computer support and graphic design to video editing, I’ve
            always loved telling stories both as a creator and a gamer. Curious
            about my gaming side? Check out my
            <a
              href="https://www.youtube.com/c/elfarus7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-white transition mx-2"
            >
              YouTube Channel
            </a>
            for gameplay, tips, and more.
          </motion.p>
          {/* counters */}
          <motion.div
            variants={fadeIn("right", 0.7)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-5">
              {/* experience */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={4} duration={5} /> +
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px] mb-2">
                  Years of experience
                </div>
              </div>
              {/* Clients */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={100} duration={5} /> +
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Satisfied Clients
                </div>
              </div>
              {/* Projects */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={200} duration={5} /> +
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Finished Projects
                </div>
              </div>
              {/* Awards */}
              <div className="relative flex-1">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={3} duration={5} /> +
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Awards
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* info */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-auto xl:h-[480px]"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`${
                  index === itemIndex &&
                  "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                } cursor-pointer capitalize xl:text-lg relative after:w-8
    after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemIndex)}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className="py-2 xl:py-6 flex flex-col gap-y-4 xl:gap-y-6 items-center xl:items-start overflow-y-auto max-h-[250px] xl:max-h-[340px] pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-thumb]:rounded-full">
            {aboutData[index].info.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex flex-col xl:flex-row gap-x-2 items-start text-white/80 w-full"
              >
                {/* Title and Icons */}
                <div className="flex-1 text-left">
                  <div className="font-light mb-2 md:mb-0">{item.title}</div>
                  {/* Icons for Skills */}
                  {item.icons && (
                    <div className="flex gap-x-4 mt-2">
                      {item.icons.map((icon, iconIndex) => (
                        <div
                          key={iconIndex}
                          className="text-2xl text-white hover:text-accent transition-all duration-300"
                        >
                          {icon}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stage (Date) */}
                {item.stage && (
                  <div className="w-full xl:w-auto text-left xl:text-right text-white/60 text-sm mt-2 xl:mt-0">
                    {item.stage}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
