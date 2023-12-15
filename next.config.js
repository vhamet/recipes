/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "bes8vz8bdqkoydip.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
