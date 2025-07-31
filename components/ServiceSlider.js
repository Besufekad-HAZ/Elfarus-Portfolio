// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {
  RxVideo,
  RxRocket,
  RxCamera,
  RxDesktop,
  RxArrowTopRight,
  RxArchive,
  RxReader,
  RxSection,
} from "react-icons/rx";

// import required modules
import { FreeMode, Pagination } from "swiper";

// import React hooks
import { useState, useRef, useEffect } from "react";

// data
const serviceData = [
  {
    key: "News",
    icon: <RxReader />,
    title: "News Coverage",
    description: "Professional news-style reporting and video packages.",
    video: "/videos/News.mp4", // Replace with your actual news video
  },
  {
    key: "Events",
    icon: <RxCamera />,
    title: "Event Videography",
    description:
      "Captivating coverage of your events, weddings, and live streams.",
    video: "/videos/Event.mp4", // Replace with your actual events video
  },
  {
    key: "Documentaries",
    icon: <RxVideo />,
    title: "Documentaries",
    description: "Compelling, story-driven documentary filmmaking.",
    video: "/videos/Documentary.mp4", // Replace with your actual documentaries video
  },
  {
    key: "Promotional",
    icon: <RxRocket />,
    title: "Promotional Reels",
    description:
      "Dynamic short videos and reels for social media and marketing.",
    video: "/videos/Reel.mp4", // Replace with your actual promotional video
  },
  {
    key: "Corporate",
    icon: <RxDesktop />,
    title: "Corporate Videos",
    description:
      "Engaging, brand-aligned videos to elevate your company's image.",
    video: "/videos/Corporate.mp4", // Replace with your actual corporate video
  },
  {
    key: "Billboards",
    icon: <RxArchive />,
    title: "Billboards",
    description: "Creative and eye-catching digital billboard advertisements.",
    video: "/videos/Billboard.mp4",
  },
  {
    key: "Entertainment",
    icon: <RxSection />,
    title: "Entertainment",
    description: "Engaging entertainment content for various platforms.",
    video: "/videos/Entertainment.mp4", // Replace with your actual entertainment video
  },
];

const ServiceSlider = ({ onServiceClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState({});

  const handleVideoLoad = (index) => {
    setVideoLoaded(prev => ({ ...prev, [index]: true }));
  };

  const handleVideoError = (index) => {
    setVideoLoaded(prev => ({ ...prev, [index]: false }));
  };

  return (
    <Swiper
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 15 },
        640: { slidesPerView: 3, spaceBetween: 15 },
      }}
      freeMode={true}
      pagination={{ clickable: true }}
      modules={[FreeMode, Pagination]}
      className="h-[240px] sm:h-[340px]"
    >
      {serviceData.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 overflow-hidden"
            onClick={() => onServiceClick(item.key)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-50 transition-opacity duration-500">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-lg"
                style={{
                  opacity: hoveredIndex === index && videoLoaded[index] ? 0.3 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
                onLoadedData={() => handleVideoLoad(index)}
                onError={() => handleVideoError(index)}
              >
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex sm:flex-col gap-x-6 sm:gap-x-0 w-full">
              {/* icon */}
              <div className="text-4xl text-accent mb-4">{item.icon}</div>
              {/* title & desc */}
              <div className="mb-8 flex-1">
                <div className="mb-2 text-lg font-semibold">{item.title}</div>
                <p className="max-w-[350px] leading-normal text-sm sm:text-base">{item.description}</p>
              </div>
              {/* arrow */}
              <div className="text-3xl">
                <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
