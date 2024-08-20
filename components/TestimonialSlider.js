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
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";

// icons
import { FaQuoteLeft } from "react-icons/fa";

// import next image
import Image from "next/image";

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-[40vh] md:h-[30vh]"
    >
      {testimonialSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col items-center md:flex-row gap-x-8 h-full
            px-16"
            >
              {/* avatar, name, position */}
              <div
                className="w-full max-w-[300px] flex flex-col xl:justify-center
              items-center relative mx-auto xl:mx-0"
              >
                <div className="flex flex-col justify-center text-center">
                  {/* avatar  */}
                  <div className="mb-2 mx-auto">
                    <Image
                      src={person.image}
                      width={100}
                      height={100}
                      alt="client images"
                      className="md:w-[150px]"
                    />
                  </div>
                  {/* name */}
                  <div className="text-lg font-semibold">{person.name}</div>
                  {/* position  */}
                  <div className="text-[12px] uppercase font-extralight tracking-widest">
                    {person.position}
                  </div>
                </div>
              </div>
              {/* quote & message */}
              <div
                className="flex-1 flex flex-col justify-center
              before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0
              xl:before:h-[200px] relative xl:pl-20"
              >
                {/* quote icon */}
                <div>
                  <FaQuoteLeft
                    className="text-4xl xl:text-6xl text-white/20
                  mx-auto md:mx-0"
                  />
                </div>
                {/* message  */}
                <div className="xl:text-lg text-center md:text-left">
                  {person.message}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;
