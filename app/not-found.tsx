"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Error from "next/error";
import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
