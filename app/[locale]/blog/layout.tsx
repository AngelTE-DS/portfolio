// app/[locale]/blog/layout.tsx
import { NextIntlClientProvider, useMessages } from "next-intl";
import "../../globals.css";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Angel's blog",
  description: "Bits of my developer path.",
  openGraph: {
    title: "Blog",
    description: "My blog",
    type: "article",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}images/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: "Blogs image",
      },
    ],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
