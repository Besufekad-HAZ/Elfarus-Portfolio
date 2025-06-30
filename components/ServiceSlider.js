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

// data
const serviceData = [
  {
    key: "News",
    icon: <RxReader />,
    title: "News Coverage",
    description: "Professional news-style reporting and video packages.",
  },
  {
    key: "Events",
    icon: <RxCamera />,
    title: "Event Videography",
    description:
      "Captivating coverage of your events, weddings, and live streams.",
  },
  {
    key: "Documentaries",
    icon: <RxVideo />,
    title: "Documentaries",
    description: "Compelling, story-driven documentary filmmaking.",
  },
  {
    key: "Promotional",
    icon: <RxRocket />,
    title: "Promotional Reels",
    description:
      "Dynamic short videos and reels for social media and marketing.",
  },
  {
    key: "Corporate",
    icon: <RxDesktop />,
    title: "Corporate Videos",
    description:
      "Engaging, brand-aligned videos to elevate your company's image.",
  },
  {
    key: "Billboards",
    icon: <RxArchive />,
    title: "Billboards",
    description: "Creative and eye-catching digital billboard advertisements.",
  },
  {
    key: "Entertainment",
    icon: <RxSection />,
    title: "Entertainment",
    description: "Engaging entertainment content for various platforms.",
  },
];

const ServiceSlider = ({ onServiceClick }) => {
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
            className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300"
            onClick={() => onServiceClick(item.key)}
          >
            {/* icon */}
            <div className="text-4xl text-accent mb-4">{item.icon}</div>
            {/* title & desc */}
            <div className="mb-8">
              <div className="mb-2 text-lg">{item.title}</div>
              <p className="maxw-[350px] leading-normal">{item.description}</p>
            </div>
            {/* arrow */}
            <div className="text-3xl">
              <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
