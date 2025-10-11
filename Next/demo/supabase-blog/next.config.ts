import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http', // 注意：你的图片用的是 http，不是 https，必须写对
        hostname: 'devimgtest.innourl.com', // 核心：图片的域名
        pathname: '/**', // 匹配该域名下所有路径（** 是通配符）
      },
    ],
  },
};

export default nextConfig;
