/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "via.placeholder.com",
      "www.fullframeinsurance.com",
      "www.entertainersworldwide.com",
      "blog.brilliance.com",
      "sheilafleet.com",
      "cdn.pixabay.com",
      "cdn.shopify.com",
      "www.pexels.com",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",
      "res.cloudinary.com",
      "img.youtube.com",
      "i.ytimg.com",
      "store.donanimhaber.com",
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Disable optimization for Cloudinary images
  },
};

module.exports = nextConfig;
