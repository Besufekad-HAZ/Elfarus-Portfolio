const workSlider = {
  slides: [
    {
      images: [
        {
          title: "title",
          path: "/thumb1.jpg",
          link: "http://ezraseminary.org/",
        },
        {
          title: "title",
          path: "/thumb2.jpg",
          link: "https://mern-dashboard-client-37t0.onrender.com/",
        },
        {
          title: "title",
          path: "/thumb3.jpg",
          link: "https://rent-motorcycles.onrender.com/",
        },
        {
          title: "title",
          path: "/thumb4.jpg",
          link: "https://url-shortner-bese-b983225bbc35.herokuapp.com/",
        },
        {
          title: "Videography Project 1",
          path: "https://www.fullframeinsurance.com/u/2024/09/16142038/8-Videography-Services-For-Starting-A-Business-Hero.webp",
          link: "https://example.com/project1",
        },
        {
          title: "Videography Project 2",
          path: "https://www.entertainersworldwide.com/graphics/cms/Videographer.jpg",
          link: "https://example.com/project2",
        },
      ],
    },
    {
      images: [
        {
          title: "title",
          path: "/thumb4.jpg",
          link: "http://ezraseminary.org/",
        },
        {
          title: "title",
          path: "/thumb1.jpg",
          link: "https://cash-buddy.onrender.com/",
        },
        {
          title: "title",
          path: "/thumb2.jpg",
          link: "https://rent-motorcycles.onrender.com/",
        },
        {
          title: "title",
          path: "/thumb3.jpg",
          link: "https://url-shortner-bese-b983225bbc35.herokuapp.com/",
        },
        {
          title: "Videography Project 7",
          path: "https://blog.brilliance.com/wp-content/uploads/2018/12/Engagement-Ring.jpg",
          link: "https://example.com/project7",
        },
        {
          title: "Videography Project 8",
          path: "https://cdn.shopify.com/s/files/1/0274/5014/6891/files/A_beautiful_heart_shaped_engagement_diamond_ring..jpg?v=1708354952",
          link: "https://example.com/project8",
        },
      ],
    },
  ],
};

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

// icons
import { BsArrowRight } from "react-icons/bs";

// import next image
import Image from "next/image";

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="h-[340px] sm:h-[500px]"
    >
      {workSlider.slides.map((slide, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 cursor-pointer">
              {slide.images.map((image, index) => {
                return (
                  <a
                    href={image.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    className="relative rounded-lg overflow-hidden flex
                      items-center justify-center group"
                  >
                    <div
                      className="flex items-center justify-center relative
                        overflow-hidden group"
                    >
                      {/* image */}
                      <Image
                        src={image.path}
                        width={500}
                        height={300}
                        alt="work slides image"
                      />
                      {/* overlay gradient */}
                      <div
                        className="absolute inset-0 bg-gradient-to-l
                          from-transparent via-[#e838cc] to-[#4a22bd] opacity-0
                          group-hover:opacity-80 transition-all duration-700"
                      ></div>
                      {/* title */}
                      <div
                        className="absolute bottom-0 translate-y-full
                          group-hover:-translate-y-10 group-hover:xl:-translate-y-20
                          transition-all duration-300"
                      >
                        <div
                          className="flex items-center gap-x-2
                            text-[13px] tracking-[0.2em]"
                        >
                          {/* title part 1  */}
                          <div className="delay-100">LIVE</div>

                          {/* title part 2  */}
                          <div
                            className="translate-y-[500%] group-hover:translate-y-0 transition-all
                              duration-300 delay-100"
                          >
                            PROJECT
                          </div>
                          {/* icon */}
                          <div
                            className="text-xl translate-y-[500%] group-hover:translate-y-0
                              transition-all duration-300 delay-200"
                          >
                            <BsArrowRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default WorkSlider;
