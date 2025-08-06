import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'littlestart.com',
        port: '',
        pathname: '/cdn/shop/**',
      },
    ],
  },
};

export default nextConfig;
