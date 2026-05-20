import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://outcomes.velveteen.sh"),
  title: {
    default: "Drew McFarland",
    template: "%s | Drew McFarland",
  },
  description:
    "Drew McFarland is a designer-builder working across GovTech, infrastructure, and early product systems.",
  openGraph: {
    title: "Drew McFarland",
    description:
      "Products, artifacts, and systems for teams working through complex delivery.",
    url: "https://outcomes.velveteen.sh",
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
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a className="skip-link" href="#main">
          Skip to work
        </a>
        {children}
      </body>
    </html>
  );
}
