import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunset Grid Synthwave Portfolio",
  description: "Full Stack Developer Portfolio - Retro Futuristic Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <div className="scanlines w-full h-full fixed pointer-events-none z-[9999]"></div>
        {children}
      </body>
    </html>
  );
}
