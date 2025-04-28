// next image
import Image from "next/image";

// next link
import Link from "next/link";

// components
import Socials from "../components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full flex items-center px-4 sm:px-10 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-3 py-4 sm:py-6 lg:py-8">
          {/* Logo */}
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={180}
              height={40}
              priority={true}
              className="cursor-pointer mix-blend-color-dodge z-10 sm:w-[200px] md:w-[220px]"
            />
          </Link>
          {/* Socials */}
          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
