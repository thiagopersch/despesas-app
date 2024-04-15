/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  reactStrictMode: true,
  experimental: { esmExternals: true },
  output: "standalone",
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    customKey: "Despesas",
  },
};

export default nextConfig;
