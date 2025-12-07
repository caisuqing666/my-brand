import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    // 在构建时忽略 ESLint 错误（可选，建议修复后移除）
    ignoreDuringBuilds: false,
  },
  typescript: {
    // 在构建时忽略 TypeScript 错误（可选，建议修复后移除）
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
