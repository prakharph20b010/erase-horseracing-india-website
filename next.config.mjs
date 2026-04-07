/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/erase-horseracing-india-website" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
