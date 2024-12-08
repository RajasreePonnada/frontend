import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagizer.imageshack.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;
