/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/sis-global-workforce", 

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;