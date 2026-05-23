import type { NextConfig } from "next";
import path from "path";

const isGitHubPages = process.env.NODE_ENV === "production";
const repositoryName = "money-is-inside";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGitHubPages ? `/${repositoryName}` : undefined,
  assetPrefix: isGitHubPages ? `/${repositoryName}/` : undefined,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "framer-motion$": path.resolve(process.cwd(), "src/lib/framer-motion.tsx")
    };

    return config;
  }
};

export default nextConfig;
