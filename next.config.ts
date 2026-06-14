import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      // Serve the self-contained portfolio-review deck at a clean URL.
      { source: "/deck", destination: "/deck/index.html" },
      { source: "/deck/", destination: "/deck/index.html" },
    ];
  },
};

export default nextConfig;
