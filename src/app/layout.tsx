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
    "Drew McFarland designs and builds GovTech and infrastructure products where the plan has to survive contact with working software.",
  openGraph: {
    title: "Drew McFarland",
    description:
      "GovTech and infrastructure work from the messy stretch between plan, proof, and running software.",
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
