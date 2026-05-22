import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "framer-motion$": path.resolve(process.cwd(), "src/lib/framer-motion.tsx")
    };

    return config;
  }
};

export default nextConfig;
