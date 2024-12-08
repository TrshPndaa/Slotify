/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Slotify", // Ensure this matches your repository name
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;