/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static export
  basePath: "/<repository-name>", // Replace with your GitHub repository name
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

module.exports = nextConfig;