/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "build",
  async rewrites() {
    return [
      {
        source: "/api/python",
        destination: "http://localhost:4001",
      },
      {
        source: "/api/node",
        destination: "http://localhost:4002",
      },
    ];
  },
};

export default nextConfig;
