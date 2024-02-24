import { createProxyMiddleware } from "http-proxy-middleware";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*", // Proxy to API server
      },
    ];
  },
};

export default nextConfig;
