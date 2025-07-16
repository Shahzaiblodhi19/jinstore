import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head"; // Add this if needed

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jin Store – Your Everyday Essentials, Delivered",
  description:
    "Discover quality groceries, snacks, and daily essentials at unbeatable prices. Shop fresh, save more, and get your favorites delivered right to your door — only at Jin Store.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Custom SVG Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
