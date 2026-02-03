import { useState, useEffect } from "react";

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
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/testimonials/list?status=approved");

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data = await response.json();
        setTestimonials(data.testimonials || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(err.message);
        // Fallback to empty array on error
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-white/70">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-red-400">Error loading testimonials: {error}</div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-white/70">No testimonials available yet.</div>
      </div>
    );
  }

  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-[50vh]"
    >
      {testimonials.map((person) => {
        return (
          <SwiperSlide key={person.id}>
            <div className="flex flex-col items-center md:flex-row gap-x-8 h-full px-16 overflow-scroll lg:overflow-hidden">
              {/* avatar, name, position */}
              <div className="w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
                <div className="flex flex-col justify-center text-center">
                  {/* avatar  */}
                  <div className="mb-2 mx-auto">
                    <Image
                      src={person.avatar}
                      width={100}
                      height={100}
                      alt={`${person.name} avatar`}
                      className="md:w-[150px] rounded-full object-cover"
                      onError={(e) => {
                        // Fallback to a default avatar if image fails to load
                        e.target.src = "/t-avt-1.png";
                      }}
                    />
                  </div>
                  {/* name */}
                  <div className="text-lg font-semibold text-white">
                    {person.name}
                  </div>
                  {/* position  */}
                  <div className="text-[12px] uppercase font-extralight tracking-widest text-white/70">
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
                  className="xl:text-lg text-center md:text-left text-white"
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
