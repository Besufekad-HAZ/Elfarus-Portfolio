// // next image
import Image from "next/image";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none xl:h-full xl:items-end xl:justify-center">
      <Image
        src={"/Suree.png"}
        width={517}
        height={478}
        alt="Avatar image"
        className="translate-z-0 w-auto h-auto max-w-[90%] max-h-[90%] mix-blend-"
      />
    </div>
  );
};

export default Avatar;
