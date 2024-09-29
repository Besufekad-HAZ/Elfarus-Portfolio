// testimonial data
const testimonialSlider = [
  {
    image: "/t-avt-1.png",
    name: "Anne Smith",
    position: "Customer",
    message:
      "As a videographer, the work and attention to detail that <span class='text-xl xl:text-2xl font-extrabold text-accent'>Elfarus</span> brought to our project was truly exceptional. They effortlessly brought our vision to life with their creative flair and cinematic expertise. The final video surpassed our expectations and really made our project stand out.",
  },
  {
    image: "/t-avt-2.png",
    name: "Jane Doe",
    position: "Customer",
    message:
      "<span class='text-xl xl:text-2xl  font-extrabold text-accent'>Elfarus</span> is a true master of their craft. Their videography skills are impeccable, capturing every moment with a keen eye and a creative touch. The professionalism and dedication they demonstrated throughout the project were truly impressive. I highly recommend <span class='text-xl xl:text-2xl font-extrabold text-accent'>Elfarus</span> for any creative endeavor.",
  },
  {
    image: "/moni1.jpg",
    name: "Yohannes Mengesha",
    position: "Cinematographer",
    message:
      "<span class='text-xl xl:text-2xl font-extrabold text-accent'>Elfarus</span> is a consummate professional. Their innovative approach and commitment to excellence made the entire process enjoyable and stress-free. The final product exceeded our expectations with its high-quality visuals and seamless editing. We're thrilled with the work <span class='text-xl xl:text-2xl font-extrabold text-accent'>Elfarus</span> has done for us.",
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
      className="h-[50vh]"
    >
      {testimonialSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center md:flex-row gap-x-8 h-full px-16">
              {/* avatar, name, position */}
              <div className="w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
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
              <div className="flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20">
                {/* quote icon */}
                <div>
                  <FaQuoteLeft className="text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0" />
                </div>
                {/* message  */}
                <div
                  className="xl:text-lg text-center md:text-left"
                  dangerouslySetInnerHTML={{ __html: person.message }}
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;
