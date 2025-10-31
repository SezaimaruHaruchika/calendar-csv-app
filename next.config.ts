import type { NextConfig } from "next";

const repo = 'calendar-csv-app';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: `/${repo}/`,
  basePath: `/${repo}`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
