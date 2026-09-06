import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://work.velveteen.sh"),
  title: {
    default: "Drew McFarland",
    template: "%s | Drew McFarland",
  },
  description:
    "Product design for the mission ahead. Product design by Drew McFarland across government, defense, and developer tools.",
  openGraph: {
    title: "Drew McFarland",
    description:
      "Product design for the mission ahead. Explore Drew McFarland’s product design work in mission planning, cloud platforms, and developer tools.",
    url: "https://work.velveteen.sh",
    siteName: "Drew McFarland",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
