//formspree
import { useForm, ValidationError } from "@formspree/react";

// icons
import { BsArrowRight } from "react-icons/bs";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// components
import Circles from "../../components/Circles";
import Bulb from "../../components/Bulb";

const Contact = () => {
  const [state, handleSubmit] = useForm("mwpervev");

  if (state.succeeded) {
    return (
      <div
        className="container mx-auto py-32 text-center xl:text-left
        flex items-center justify-center h-full"
      >
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 text-center mb-12"
        >
          Thanks for <span className="text-accent">connecting.</span>
        </motion.h2>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-primary/30">
      <div
        className="container mx-auto py-32 text-center xl:text-left
        flex items-center justify-center h-full"
      >
        <Bulb />
        <div className="flex flex-col w-full max-w-[700px] mt-11 pt-5 md:mt-10 md:pt-10 xl:mt-0 xl:pt-0 px-4">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-center mb-12"
          >
            Let&#39;s <span className="text-accent">connect.</span>
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1 flex flex-col gap-6 w-full mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-6 w-full">
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input flex-1"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input flex-1"
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="subject"
              className="input"
              required
            />
            <textarea
              name="message"
              placeholder="message"
              className="textarea"
              required
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
              className="btn rounded-full border border-white/50
              w-full sm:max-w-[170px] transition-all duration-300 flex items-center
              justify-center overflow-hidden hover:border-accent group"
            >
              <span
                className="group-hover:-translate-y-[120%] group-hover:opacity-0
                transition-all duration-500"
              >
                Let&#39;s talk
              </span>
              <BsArrowRight
                className="-translate-y-[120%] opacity-0 group-hover:flex
                group-hover:-translate-y-0 group-hover:opacity-100 transition-all
                duration-300 absolute text-[22px]"
              />
            </button>
          </motion.form>
        </div>
      </div>
      <Circles />
    </div>
  );
};

export default Contact;
