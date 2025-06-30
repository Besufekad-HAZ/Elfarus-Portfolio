// icons
import {
  // FaHtml5,
  // FaCss3,
  // FaJs,
  // FaReact,
  // FaWordpress,
  FaFigma,
} from "react-icons/fa";

import {
  SiAdobexd,
  SiAdobephotoshop,
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobeindesign,
  SiAdobepremierepro,
  SiAdobeaudition,
  SiDavinciresolve, // <-- ADD THIS
} from "react-icons/si";

const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Video editing",
        stage: "",
        icons: [
          <SiAdobeaftereffects key="aftereffects" />,
          <SiAdobeaudition key="adobeaudition" />,
          <SiAdobepremierepro key="premierepro" />,
          <SiDavinciresolve key="davinciresolve" />,
        ],
      },
      {
        title: "Graphic Design",
        stage: "",
        icons: [
          <SiAdobephotoshop key="photoshop" />,
          <SiAdobexd key="xd" />,
          <SiAdobeillustrator key="illustrator" />,
          <SiAdobeindesign key="indesign" />,
        ],
      },
    ],
  },
  {
    title: "awards",
    info: [
      {
        title: "Purpose Black Creative Innovation Award",
        stage: "2024",
      },
      {
        title: "RDX Delta Rabbit Operational Excellence Award",
        stage: "2021",
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Deputy & Editor Manager - Eagle pictures Ethiopia ",
        stage: "Aug 2023 - Present",
      },
      {
        title: "Video Editor & Graphics - Purpose Black Ethiopia",
        stage: "Sept. 2023 - Sept. 2024",
      },
      {
        title: "Video Editor - Black Future Consultancy S.C",
        stage: "Aug. 2023 - Oct. 2023",
      },
      {
        title: "Video Editor - Ethio Negari",
        stage: "July 2022 - Dec. 2022",
      },
      {
        title: "Video Editor & Graphics - Anointing TV WORLD WIDE",
        stage: "Jan. 2021 - Feb. 2021",
      },
      {
        title: "Agent, PC Builder, Driver - (RDX Delta Rabbit)",
        stage: "Aug. 2019 - Present",
      },
    ],
  },
  {
    title: "credentials",
    info: [
      {
        title:
          "Cinematography - Tom Videography & Photography Training Center / Addis Ababa, AA, Ethiopia",
        stage: "Dec. 2020 - Dec. 2021",
      },
      {
        title:
          "Software Engineering - Wolkite University / Gubre, SN, Ethiopia",
        stage: "Nov. 2013 - July 2017",
      },
      {
        title: "IT Essentials - Cisco Networking Academy / Gubre, SN, Ethiopia",
        stage: "Oct. 2015 - July 2016",
      },
      {
        title:
          "Cisco Certified Networking Associate (CCNA) - Cisco Networking Academy / Gubre, SN, Ethiopia",
        stage: "Oct. 2014 - July 2015",
      },
      {
        title:
          "Advanced Computer Maintenance & Networking - SATCOM Institute of Technology / Addis Ababa, AA, Ethiopia",
        stage: "Jun. 2012 - Nov. 2012",
      },
      {
        title:
          "Cell-Phone Maintenance - SATCOM Institute of Technology / Addis Ababa, AA, Ethiopia",
        stage: "Apr. 2012 - Sept. 2012",
      },
    ],
  },
];

export default aboutData;
