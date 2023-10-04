/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["types", "database"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
