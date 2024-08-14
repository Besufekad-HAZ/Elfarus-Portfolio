import ServiceSlider from "../../components/ServiceSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const Services = () => {
  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <Circles />
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* text */}
          <motion.div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4">
            <h2 className="h2 xl:mt-8">
              My Services <span className="text-accent">.</span>{" "}
            </h2>
            <p className="mb-4 max-w-[400px] mx-auto lg:mx-0 text-white">
              As a versatile videographer and video editor, I offer a
              comprehensive suite of services to elevate your brand's visual
              presence:{" "}
              <ul className="list-disc pl-6 mt-4">
                <li>Corporate Video Production</li>
                <li>Promotional and Marketing Videos</li>
                <li>Event Videography and Livestreaming</li>
                <li>Cinematic Storytelling and Editing</li>
                <li>Motion Graphics and Visual Effects</li>
                <li>Sound Design and Audio Post-Production</li>
              </ul>
              With a keen eye for detail and a collaborative approach, I work
              closely with clients to bring their creative vision to life and
              deliver high-quality, impactful videos tailored to their unique
              needs and objectives.
            </p>
          </motion.div>
          {/* slider */}
          <ServiceSlider />
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Services;
