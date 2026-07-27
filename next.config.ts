import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/work/forge",
        destination: "/work/space-force-cloud-platform",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Serve the self-contained portfolio-review deck at a clean URL.
      { source: "/deck", destination: "/deck/index.html" },
      { source: "/deck/", destination: "/deck/index.html" },
    ];
  },
};

export default nextConfig;
