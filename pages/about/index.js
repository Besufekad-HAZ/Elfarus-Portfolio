import React, { useState } from "react";

// icons
import {
  // FaHtml5,
  // FaCss3,
  // FaJs,
  // FaReact,
  // FaWordpress,
  FaFigma,
} from "react-icons/fa";

import {
  SiAdobexd,
  SiAdobephotoshop,
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobeindesign,
  SiAdobepremierepro,
  SiAdobeaudition,
  SiDavinciresolve, // <-- ADD THIS
} from "react-icons/si";

// components
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// counter
import CountUp from "react-countup";

// data
const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Video editing",
        icons: [
          <SiAdobeaftereffects key="aftereffects" />,
          <SiAdobeaudition key="adobeaudition" />,
          <SiAdobepremierepro key="premierepro" />,
          <SiDavinciresolve key="davinciresolve" />,
        ],
      },
      {
        title: "Graphic Design",
        icons: [
          <SiAdobephotoshop key="photoshop" />,
          <SiAdobexd key="xd" />,
          <SiAdobeillustrator key="illustrator" />,
          <SiAdobeindesign key="indesign" />,
        ],
      },
    ],
  },
  {
    title: "awards",
    info: [
      {
        title: "Webby Awards - Honoree",
        stage: "2011 - 2012",
      },
      {
        title: "Adobe Design Achievement Awards - Finalist",
        stage: "2009 - 2010",
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Video Editor & Graphics - Purpose Black Ethiopia",
        stage: "Sept. 2023 - Sept. 2024",
      },
      {
        title: "Video Editor - Black Future Consultancy S.C",
        stage: "Aug. 2023 - Oct. 2023",
      },
      {
        title: "Video Editor - Ethio Negari",
        stage: "July 2022 - Dec. 2022",
      },
      {
        title: "Video Editor & Graphics - Anointing TV WORLD WIDE",
        stage: "Jan. 2021 - Feb. 2021",
      },
      {
        title: "Reseller, PC Builder, Driver - Tessema Zirgua Importing (RDX)",
        stage: "Aug. 2019 - Present",
      },
    ],
  },
  {
    title: "credentials",
    info: [
      {
        title: "Web Development - ABC University, LA, CA",
        stage: "2011",
      },
      {
        title: "Computer Science Diploma - AV Technical Institute",
        stage: "2009",
      },
      {
        title: "Certified Graphic Designer - ABC Institute, Los Angeles, CA",
        stage: "2006",
      },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);
  console.log(index);
  return (
    <div className="h-full bg-primary/30 mt-6 xl:mt-0 py-32 text-center xl:text-left">
      <Circles />
      {/* Avatar img */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div>
      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
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
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-white"
          >
            My journey into the world of computers began 15 years ago with
            gaming. This initial spark ignited a lifelong passion for
            understanding how these machines work, leading me to delve into
            computer support, maintenance, graphic design, and eventually, the
            dynamic world of video editing.
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
                  <CountUp start={0} end={10} duration={5} /> +
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
                  <CountUp start={0} end={5} duration={5} /> +
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
          className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
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
          <div className="py-4 xl:py-6 flex flex-col gap-4">
            {aboutData[index].info.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="w-full flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                <div className="flex flex-col">
                  {/* Experience Title */}
                  <span className="font-light text-base md:text-lg">
                    {item.title}
                  </span>
                  {/* Experience Duration */}
                  <span className="text-sm md:text-base text-gray-300">
                    {item.stage}
                  </span>
                </div>
                {item.icons && (
                  <div className="flex gap-4 mt-2 md:mt-0">
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
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
