// testimonial data
const testimonialSlider = [
  {
    image: "/t-avt-1.png",
    name: "Anne Smith",
    position: "Customer",
    message:
      "The video editing and graphic design work was exceptional. Truly brought our vision to life!",
  },
  {
    image: "/t-avt-2.png",
    name: "Jane Doe",
    position: "Customer",
    message:
      "Outstanding videography! Captured every moment perfectly. Highly recommend for any project.",
  },
  {
    image: "/t-avt-3.png",
    name: "John Doe",
    position: "Customer",
    message:
      "Professional and creative. The final product exceeded our expectations. Great job!",
  },
];

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

// icons
import { FaQuoteLeft } from "react-icons/fa";

// import next image
import Image from "next/image";

const TestimonialSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="h-[280px] sm:h-[480px]"
    >
      {testimonialSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div>
              {/* avatar, name, position */}
              <div>
                {/* avatar  */}
                <img src={person.image} alt="" />
                {/* name */}
                <div className="text-xl font-semibold">{person.name}</div>
                {/* position  */}
                <div className="text-sm">{person.position}</div>
              </div>
              {/* quote & message */}
              <div>
                {/* quote icon */}
                <div>
                  <FaQuoteLeft className="text-4xl" />
                </div>
                {/* message  */}
                <div className="text-lg font-semibold">{person.message}</div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;
