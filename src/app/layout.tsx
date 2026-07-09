import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/layout/SkipLink";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getHomePage, getSiteSettings } from "@/lib/content";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteSettings = getSiteSettings();
const homePage = getHomePage();

export const metadata: Metadata = {
  title: homePage.seo.title,
  description: homePage.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-foreground">
        <SkipLink />
        <Header siteSettings={siteSettings} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
