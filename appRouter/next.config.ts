import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.themoviedb.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
