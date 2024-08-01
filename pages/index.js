// next image
import Image from "next/image";

// components
import ParticlesContainer from "../components/ParticlesContainer";
import ProjectBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";

// framer motion
import { motion } from "framer-motion";

// variants
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="bg-primary/60 h-full ">
      {/* Text */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div
          className="text-center flex flex-col justify-center xl:pt-40
        h-full container mx-auto"
        >
          {/* title */}
          <h1 className="h1">
            Elfarus <br />Transforming Ideas <br /> Into{" "}
            <span className="text-accent">Digital Reality</span>
          </h1>
          {/* Subtitle */}
          <p className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            nulla nam impedit sequi molestias quam quasi, maiores libero harum
            ducimus possimus sit commodi doloremque eos est fugit deleniti
            distinctio animi optio. Cumque, est repudiandae laboriosam, modi
            sunt praesentium odit repellendus in ab nam cum dignissimos!
          </p>
        </div>
      </div>
      {/* Image */}
      <div>image</div>
    </div>
  );
};

export default Home;
