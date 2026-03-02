import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Required for GitHub Pages — replace "chargeway" with your repo name
  // Remove basePath if using a custom domain or Vercel
  // basePath: "/chargeway",
};

export default nextConfig;
