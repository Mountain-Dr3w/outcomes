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
  metadataBase: new URL("https://work.velveteen.sh"),
  title: {
    default: "Drew McFarland",
    template: "%s | Drew McFarland",
  },
  description:
    "Drew McFarland's product design work across government, defense, and developer tools.",
  openGraph: {
    title: "Drew McFarland",
    description:
      "Case studies in GovTech, defense, and developer infrastructure from a product designer who also builds.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
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
