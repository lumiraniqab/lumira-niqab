import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Outfit } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMIRA — Where Modesty Meets Luxury",
  description: "Premium Abayas • Hijabs • Niqabs • Prayer Dresses • Maxis • Perfumes curated for women who value elegance and comfort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${outfit.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
