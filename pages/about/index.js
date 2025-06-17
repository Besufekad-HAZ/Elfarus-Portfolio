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
        title: "Purpose Black Creative Innovation Award",
        stage: "2024",
      },
      {
        title: "RDX Delta Rabbit Operational Excellence Award",
        stage: "2021",
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Deputy & Editor Manager - Eagle pictures Ethiopia ",
        stage: "Aug 2023 - Present",
      },
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
        title: "Agent, PC Builder, Driver - (RDX Delta Rabbit)",
        stage: "Aug. 2019 - Present",
      },
    ],
  },
  {
    title: "credentials",
    info: [
      {
        title:
          "Cinematography - Tom Videography & Photography Training Center / Addis Ababa, AA, Ethiopia",
        stage: "Dec. 2020 - Dec. 2021",
      },
      {
        title:
          "Software Engineering - Wolkite University / Gubre, SN, Ethiopia",
        stage: "Nov. 2013 - July 2017",
      },
      {
        title: "IT Essentials - Cisco Networking Academy / Gubre, SN, Ethiopia",
        stage: "Oct. 2015 - July 2016",
      },
      {
        title:
          "Cisco Certified Networking Associate (CCNA) - Cisco Networking Academy / Gubre, SN, Ethiopia",
        stage: "Oct. 2014 - July 2015",
      },
      {
        title:
          "Advanced Computer Maintenance & Networking - SATCOM Institute of Technology / Addis Ababa, AA, Ethiopia",
        stage: "Jun. 2012 - Nov. 2012",
      },
      {
        title:
          "Cell-Phone Maintenance - SATCOM Institute of Technology / Addis Ababa, AA, Ethiopia",
        stage: "Apr. 2012 - Sept. 2012",
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
            gaming, fueling my passion for technology and creativity. From
            computer support and graphic design to video editing, I’ve always
            loved telling stories—both as a creator and a gamer. Curious about
            my gaming side?
            <a
              href="https://www.youtube.com/c/elfarus7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-white transition"
            >
              Check out my YouTube channel
            </a>{" "}
            for gameplay, tips, and more!
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
