import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  async redirects() {
    return [
      ...["jigsaw", "veriflux"].map((slug) => ({
        source: `/case-study/${slug}`,
        destination: `/work/${slug}`,
        permanent: true,
      })),
      { source: "/case-study/forge", destination: "/work/space-force-cloud-platform", permanent: true },
      { source: "/portfolio", destination: "/#work", permanent: true },
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/resume.pdf", destination: "/resume/Drew_McFarland_Resume.pdf", permanent: true },
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
