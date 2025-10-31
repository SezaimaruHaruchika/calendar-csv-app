import type { NextConfig } from "next";

const repo = 'calendar-csv-app';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isProd ? `/${repo}/` : '',
  basePath: isProd ? `/${repo}` : '',
};

export default nextConfig;
