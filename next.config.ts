import type { NextConfig } from "next";

const repo = 'calendar-csv-app';
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isProd ? `/${repo}/` : '',
  basePath: isProd ? `/${repo}` : '',
};

export default nextConfig;
