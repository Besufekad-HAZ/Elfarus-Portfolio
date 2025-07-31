import React, { useState } from "react";
import Image from "next/image";
import ServiceSlider from "../../components/ServiceSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import ProjectsModal from "../../components/ProjectsModal"; // Import the new component
import serviceProjectsData from "../../data/services/data"; // Import the service projects data
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// Helper to extract YouTube video ID from various URL formats
const getYoutubeVideoId = (url) => {
  let videoId;
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  } else if (url.includes("/shorts/")) {
    videoId = url.split("/shorts/")[1].split("?")[0];
  }
  return videoId;
};

const serviceProjects = Object.fromEntries(
  Object.entries(serviceProjectsData).map(([category, projects]) => [
    category,
    projects.map((project) => ({
      ...project,
      thumbnail: `https://i.ytimg.com/vi/${getYoutubeVideoId(
        project.link
      )}/maxresdefault.jpg`,
    })),
  ])
);

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const handleOpenModal = (serviceKey) => {
    setCurrentService(serviceKey);
    setModalOpen(true);
  };

  return (
    <div className="min-h-[100vh] bg-primary/30 py-24 sm:py-36 flex items-center">
      <Circles />
      <div className="container mx-auto mt-12 pt-8 lg:mt-0 lg:pt-2 px-4">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* text */}
          <motion.div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4">
            <motion.h2
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8"
            >
              My Services <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0 text-white text-sm sm:text-base px-2 lg:px-0"
            >
              Enhance your brand&#39;s visuals with my videography and editing
              services. From corporate videos and promo reels to event coverage
              and post-production, I bring your ideas to life with detail and a
              personalized touch.
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
            <ServiceSlider onServiceClick={handleOpenModal} />
          </motion.div>
        </div>
      </div>
      <Bulb />
      {/* Modal */}
      <ProjectsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projects={serviceProjects[currentService] || []}
        title={currentService}
      />
    </div>
  );
};

export default Services;
