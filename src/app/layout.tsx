import type { Metadata } from "next";
import { Geist, Archivo } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FORJ Fitness | A dojo, not a gym. Meydan, Dubai",
  description:
    "Small-group coached strength in Meydan. Eight people to a class, an eight-week cycle, and a coach who knows your name. Founding memberships now open.",
  keywords: [
    "FORJ",
    "FORJ Fitness",
    "Dubai Gym",
    "Meydan Fitness",
    "Strength Training Dubai",
    "Coached Strength",
    "Small Group Training",
  ],
  openGraph: {
    title: "FORJ Fitness | A dojo, not a gym. Meydan, Dubai",
    description:
      "Small-group coached strength in Meydan. Eight people to a class, an eight-week cycle, and a coach who knows your name.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/forj-logo.png",
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
      className={`${geist.variable} ${archivo.variable} scroll-smooth bg-[#0A0A0A]`}
    >
      <body className="min-h-screen bg-[#0A0A0A] text-white antialiased flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
