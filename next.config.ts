import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.watchOptions = {
      ignored: ['**/server/**', '**/node_modules/**'],
    };
    return config;
  },
};
export default nextConfig;
