import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i2.hdslb.com",
        // port: "",
        // pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
