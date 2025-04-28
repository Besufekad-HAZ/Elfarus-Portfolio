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
      "www.pexels.com",
    ],
  },
};

module.exports = nextConfig;
