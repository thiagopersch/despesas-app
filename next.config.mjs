/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  swcMinify: true,
  reactStrictMode: true,
  experimental: { esmExternals: true },
  output: "standalone",
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
