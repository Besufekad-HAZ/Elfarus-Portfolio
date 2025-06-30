// next image
import Image from "next/image";

// next link
import Link from "next/link";

// components
import Socials from "./Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full flex items-center px-4 sm:px-10 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-3 py-4 sm:py-6 lg:py-8">
          {/* Logo */}
          <Link href={"/"} style={{ marginTop: 10 }}>
            <Image
              src="/logo1.png"
              alt="Logo"
              width={100}
              height={20}
              priority={true}
              className="mt-3 cursor-pointer mix-blend-color-dodge z-10 w-[100px] md:w-[120px] h-auto"
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
