import ServiceSlider from "../../components/ServiceSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const Services = () => {
  return <div>
    <Circles />
    <ServiceSlider />
    <Bulb />
  </div>;
};

export default Services;
