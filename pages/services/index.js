import React, { useState } from "react";
import Image from "next/image";
import ServiceSlider from "../../components/ServiceSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import ProjectsModal from "../../components/ProjectsModal"; // Import the new component

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// Helper to extract YouTube video ID from various URL formats
const getYoutubeVideoId = (url) => {
  let videoId;
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  } else if (url.includes("/shorts/")) {
    videoId = url.split("/shorts/")[1].split("?")[0];
  }
  return videoId;
};

// Updated and categorized project data
const serviceProjectsData = {
  Events: [
    { title: "Ebenezer and Yab Wedding", link: "https://youtu.be/2FAa0p3TsX0" },
    {
      title: "የጥምቀት በዓልን ከጸሐፊ ተውኔት እና ባለ ቅኔ አያለነህ ሙላቱ ጋር",
      link: "https://youtu.be/zwEloqcXdWA",
    },
    { title: "ዓለም አቀፍ የውሃ ቀን", link: "https://youtu.be/wdw9AkC7k4w" },
    {
      title: "የፐርፐዝብላክ ኢትዮጵያ የገና ቆይታ በሲዳማ",
      link: "https://youtu.be/0Wjh-fG78zw",
    },
    {
      title: "Labor day at PurposeBlack Ethiopia Head office",
      link: "https://youtu.be/hJ2BmpkRZ9k",
    },
    {
      title: "ኢድ አል ፈጥር በዓል አከባበር በኢትዮጵያ",
      link: "https://youtu.be/d4HFb6Xu3I8",
    },
    { title: "ልዩ የትንሳኤ መዝናኛ ዝግጅት", link: "https://youtu.be/qEN302aorgA" },
    {
      title: "Water Day 2024 On PurposeBlack Company",
      link: "https://youtu.be/yOXhdwO25i8",
    },
  ],
  News: [
    {
      title: "Amharic news TTV 24 NEWS (12-4-2024)",
      link: "https://youtu.be/hwE2YLhP_1c",
    },
    {
      title: "Amharic news TTV 24 NEWS (12-18-2024)",
      link: "https://youtu.be/6enJkogoKOA",
    },
    { title: "መጋቢት 29 ሳምንታዊ ዜና", link: "https://youtu.be/GeliAWMPKKw" },
    { title: "AUGUST 3 WEEKLY NEWS", link: "https://youtu.be/pAR7vhs4Rs0" },
  ],
  Documentaries: [
    { title: "የኩታ ገጠም ዶክመንተሪ", link: "https://youtu.be/xyMBx1cQ7m8" },
    {
      title: "CLUSTER ENGLISH DOCUMENTRY PurposeBlack",
      link: "https://youtu.be/KSFmKKdi4jU",
    },
    { title: "የባለ ራዕዮች ጉዞ", link: "https://youtu.be/zwnq3zGXyFk" },
  ],
  Corporate: [
    {
      title: "Investors Corner: የምርት አሰባሰባችን እና ብክነት",
      link: "https://youtu.be/BJm1V1jGzZU",
    },
    {
      title: "ፐርፐዝብላክ ኢትዮጵያ ወደ ቡና ኢንቨስትመንት",
      link: "https://youtu.be/xHCkkRCYlwU",
    },
    {
      title: "Investors Corner: ፐርፐዝብላክ የምርት ቆይታ ጊዜን ለማሳጠር",
      link: "https://youtu.be/VbHVDXdmylc",
    },
    {
      title: "Inverters corner: በኢትዮጵያ በዓመት አንድ ሰው ከአንድ ኪሎ ያነሰ አሣ ነው የሚያገኘው",
      link: "https://youtu.be/cIKsynZwMyo",
    },
    { title: "NEWAYE ENQB 9TH tv", link: "https://youtu.be/egg8G47YrUc" },
  ],
  Promotional: [
    { title: "የእንስሳት ስሞችና የከተሜው መልሶቻቸው", link: "https://youtu.be/WJsiaaBtV5M" },
    { title: "የምግብ ስሞችና የከተሜው መልሶቻቸው", link: "https://youtu.be/mSwh8nr2TrI" },
    { title: "Promotional Video", link: "https://youtu.be/N7Re49KtEAw" },
    { title: "Promotional Video", link: "https://youtu.be/qdE4DDJVmOc" },
    { title: "Promotional Video", link: "https://youtu.be/WK1sfmhhohU" },
    {
      title: "Promotional Reel",
      link: "https://youtube.com/shorts/K6aCfrXwH9o",
    },
    {
      title: "Promotional Reel",
      link: "https://youtube.com/shorts/SBt-q0DO8F8",
    },
    {
      title: "Promotional Reel",
      link: "https://youtube.com/shorts/y3EyRtEB5Zk",
    },
    {
      title: "Promotional Reel",
      link: "https://youtube.com/shorts/HtQnMRGt4_c",
    },
  ],
  Billboards: [
    { title: "Billboard Project 1", link: "https://youtu.be/3208BhwbFxU" },
    { title: "Billboard Project 2", link: "https://youtu.be/w8AN8DElWpI" },
    { title: "Billboard Project 3", link: "https://youtu.be/JNgy-8kvN84" },
    { title: "Billboard Project 4", link: "https://youtu.be/C5PVULspuU0" },
    { title: "Billboard Project 5", link: "https://youtu.be/ieWUIc9I8wM" },
    { title: "Billboard Project 6", link: "https://youtu.be/TRqchRODNJg" },
  ],
};

const serviceProjects = Object.fromEntries(
  Object.entries(serviceProjectsData).map(([category, projects]) => [
    category,
    projects.map((project) => ({
      ...project,
      thumbnail: `https://i.ytimg.com/vi/${getYoutubeVideoId(
        project.link
      )}/maxresdefault.jpg`,
    })),
  ])
);

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const handleOpenModal = (serviceKey) => {
    setCurrentService(serviceKey);
    setModalOpen(true);
  };

  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <Circles />
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* text */}
          <motion.div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4">
            <motion.h2
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8"
            >
              My Services <span className="text-accent">.</span>{" "}
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0 text-white"
            >
              Enhance your brand&#39;s visuals with my videography and editing
              services. From corporate videos and promo reels to event coverage
              and post-production, I bring your ideas to life with detail and a
              personalized touch.
            </motion.p>
          </motion.div>
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            {/* slider */}
            <ServiceSlider onServiceClick={handleOpenModal} />
          </motion.div>
        </div>
      </div>
      <Bulb />
      {/* Modal */}
      <ProjectsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projects={serviceProjects[currentService] || []}
        title={currentService}
      />
    </div>
  );
};

export default Services;
