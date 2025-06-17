import React, { useState } from "react";
import Image from "next/image";
import ServiceSlider from "../../components/ServiceSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../variants";

// Example data for each service
const serviceProjects = {
  Corporate: [
    {
      title: "Corporate Video 1",
      thumbnail: "https://img.youtube.com/vi/78aXOBBf2z4/maxresdefault.jpg",
    },
    {
      title: "Corporate Video 2",
      thumbnail: "https://i.ytimg.com/vi/7EmmywKOukk/maxresdefault.jpg",
    },
  ],
  Promotional: [
    {
      title: "Promo Reel 1",
      thumbnail:
        "https://store.donanimhaber.com/da/25/b3/da25b36436f69fb44f93bd5a98592898.jpeg",
    },
    {
      title: "Promo Reel 2",
      thumbnail: "https://www.youtube.com/watch?v=hScJxQmr-vY",
    },
  ],
  Event: [
    {
      title: "Event Coverage 1",
      thumbnail: "https://www.youtube.com/watch?v=hScJxQmr-vY",
    },
    {
      title: "Event Coverage 2",
      thumbnail: "https://www.youtube.com/watch?v=FobrlKKwt0c",
    },
  ],
  Cinematic: [],
  Motion: [],
};

// --- Modal Component ---
const ProjectsModal = ({ open, onClose, projects, title }) => {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-primary rounded-2xl shadow-2xl border border-accent/30 p-8 max-w-3xl w-full relative mx-4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-accent transition"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold mb-6 text-accent text-center tracking-wide">
            {title} Projects
          </h3>
          {projects.length === 0 ? (
            <div className="text-white text-center py-12 text-lg">
              No projects yet.
            </div>
          ) : (
            <Swiper spaceBetween={30} slidesPerView={1}>
              {projects.map((project, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center">
                    <div className="w-full flex justify-center">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        width={700}
                        height={394}
                        className="rounded-xl mb-4 max-h-[400px] object-cover border border-accent/20 shadow-lg"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="text-white font-semibold text-lg text-center">
                      {project.title}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
// --- End Modal Component ---

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const handleOpenModal = (serviceKey) => {
    setCurrentService(serviceKey);
    setModalOpen(true);
  };

  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <Circles />
      <div className="container mx-auto">
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
              My Services <span className="text-accent">.</span>{" "}
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0 text-white"
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
