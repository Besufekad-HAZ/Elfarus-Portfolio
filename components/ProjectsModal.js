import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { RxPlay, RxArrowLeft, RxArrowRight } from "react-icons/rx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

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

const ProjectsModal = ({ open, onClose, projects, title }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  // Reset video state when modal is closed by parent
  useEffect(() => {
    if (!open) {
      setPlayingVideo(null);
    }
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    setPlayingVideo(null);
    onClose();
  };

  const videoId = playingVideo ? getYoutubeVideoId(playingVideo.link) : null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-primary/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-accent/30 p-6 md:p-8 max-w-4xl w-full relative mx-4 flex flex-col"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-accent transition z-30"
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Header Section */}
          <div className="mb-6 h-8">
            {!playingVideo ? (
              <h3 className="text-2xl font-bold text-accent text-center tracking-wide">
                {title} Projects
              </h3>
            ) : (
              <button
                onClick={() => setPlayingVideo(null)}
                className="flex items-center gap-x-2 text-white hover:text-accent transition z-20 relative"
              >
                <RxArrowLeft /> Back to Gallery
              </button>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1">
            {projects.length === 0 ? (
              <div className="text-white text-center py-12 text-lg">
                No projects yet.
              </div>
            ) : playingVideo ? (
              // --- VIDEO PLAYER VIEW ---
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={playingVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            ) : (
              // --- GALLERY VIEW ---
              <div className="relative">
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="h-[300px] md:h-[450px] w-full rounded-lg"
                >
                  {projects.map((project, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="flex flex-col items-center group h-full">
                        <div className="w-full h-full flex justify-center relative">
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                          />
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl cursor-pointer"
                            onClick={() => setPlayingVideo(project)}
                          >
                            <RxPlay className="text-white text-6xl" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 bg-black/50 text-white p-2 rounded-md font-semibold text-sm md:text-base text-center">
                          {project.title}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-2 z-10 p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 hover:scale-110 transition-all duration-300">
                  <RxArrowLeft className="text-white text-2xl" />
                </div>
                <div className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-2 z-10 p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 hover:scale-110 transition-all duration-300">
                  <RxArrowRight className="text-white text-2xl" />
                </div>

                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="h-[80px] md:h-[100px] mt-4"
                >
                  {projects.map((project, idx) => (
                    <SwiperSlide
                      key={idx}
                      className="rounded-lg overflow-hidden cursor-pointer opacity-50 hover:opacity-100 transition-all duration-300 border-2 border-transparent [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-accent"
                    >
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectsModal;
