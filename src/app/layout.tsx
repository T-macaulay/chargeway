import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DriveEV Nigeria — Save Money, Drive Electric",
  description:
    "Nigeria's #1 EV marketplace. Find your perfect electric vehicle, compare prices from verified vendors, and save up to ₦200,000/month on fuel. Built in Lagos.",
  keywords: [
    "buy EV in Nigeria",
    "electric cars Lagos",
    "EV Nigeria",
    "electric vehicle marketplace",
    "DriveEV",
  ],
  openGraph: {
    title: "DriveEV — Nigeria's Electric Vehicle Marketplace",
    description: "Stop burning cash on fuel. Switch to electric.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
