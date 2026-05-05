import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Born To Win | Elite Initiative",
  description: "Unleash your potential and win extraordinary rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className={cn(inter.variable, playfair.variable, "min-h-screen flex flex-col font-sans antialiased overflow-x-hidden")} suppressHydrationWarning>
        <Providers>
          <div className="flex-grow flex flex-col overflow-x-hidden">
            {children}
          </div>
          <Footer />
          <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
