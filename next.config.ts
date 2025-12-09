import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    // 在构建时忽略 ESLint 错误（临时措施，建议后续修复再改回）
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在构建时忽略 TypeScript 错误（可选，建议修复后移除）
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
