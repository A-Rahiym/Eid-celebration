/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eid Together — Global Celebration Wall",
  description:
    "Why celebrate alone when millions across the globe share this blessed moment with you? One night, one moon, one celebration — together.",
  openGraph: {
    title: "Eid Together — Global Celebration Wall",
    description:
      "Share your Eid wishes with the world. One night, one moon, one celebration — together.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@200;300;400;500&family=Noto+Serif+Arabic:wght@300;400&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
