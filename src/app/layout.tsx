import type { Metadata } from "next";
import Script from "next/script";
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
    "Small-group coached strength in Meydan, Dubai. Eight to a class, eight-week cycles, no gimmicks — the original work, programmed properly. Founding memberships: 20 numbers, once.",
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
      "Small-group coached strength in Meydan, Dubai. Eight to a class, eight-week cycles, no gimmicks — the original work, programmed properly. Founding memberships: 20 numbers, once.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Big+Shoulders+Stencil+Display:wght@100..900&family=Big+Shoulders+Stencil+Text:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0A0A0A] text-white antialiased flex flex-col font-sans">
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XBBR1JMWVT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XBBR1JMWVT');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yilugh41c9");
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
