import Link from "next/link";

//icons
import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookLine,
  RiBehanceLine,
  RiPinterestLine,
  RiTiktokLine,
} from "react-icons/ri";

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-xl">
      <Link href="https://www.youtube.com/@ELFARUS7" legacyBehavior passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-all duration-300"
        >
          <RiYoutubeLine />
        </a>
      </Link>
      <Link href="https://www.facebook.com/elfarus7" legacyBehavior passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-all duration-300"
        >
          <RiFacebookLine />
        </a>
      </Link>
      <Link href="https://www.instagram.com/elfarus7" legacyBehavior passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-all duration-300"
        >
          <RiInstagramLine />
        </a>
      </Link>
      <Link href="https://www.tiktok.com/@elfarus" legacyBehavior passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-all duration-300"
        >
          <RiTiktokLine />
        </a>
      </Link>
      <Link href="" legacyBehavior passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-all duration-300"
        >
          <RiBehanceLine />
        </a>
      </Link>
      <Link href="" legacyBehavior passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-all duration-300"
        >
          <RiPinterestLine />
        </a>
      </Link>
    </div>
  );
};

export default Socials;
