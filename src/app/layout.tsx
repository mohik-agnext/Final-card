import type { Metadata, Viewport } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancingScript = Dancing_Script({ 
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Celebration Cards Generator",
  description: "Generate beautiful celebration cards for various occasions",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancingScript.variable} font-sans`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
} 