import { createProxyMiddleware } from "http-proxy-middleware";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://softuniada-project-backend.onrender.com/api/:path*", // Proxy to API server
      },
    ];
  },
};

export default nextConfig;
