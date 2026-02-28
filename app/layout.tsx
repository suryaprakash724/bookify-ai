import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import Navbar from "@/components/Navbar";

const ibmflexserif = IBM_Plex_Serif({
  variable: "--font-ibmplexserif",
  weight: ["400","500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const monasans=Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bookify AI",
  description: "Transform your books into interactive AI conversations. Upload your PDF and chat with books using voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${ibmflexserif.variable} ${monasans.variable} relative font-sans antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
