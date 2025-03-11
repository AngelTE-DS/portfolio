import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import SiteHeader from "@/components/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/site-footer";
import { NextIntlClientProvider, useMessages } from "next-intl";
import PageTransition from "@/components/page-transition";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Miuler's site",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme:dark", color: "black" },
  ],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: "en" | "es";
  };
}) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={locale} className="scroll-pt-[3.5rem]">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <SiteHeader />
              <PageTransition>
                <main className="flex-1">{children}</main>
              </PageTransition>
              <SiteFooter />
            </div>
          </Providers>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
