"use client";

import Link from "next/link";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function MainNav() {
  const pathname = usePathname();

  const locale = pathname.split("/")[1];

  const createHref = (path: string) => `/${locale}${path}`;

  const t = useTranslations();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href={createHref("/")}
        className="mr-6 flex items-center space-x-2 hover:scale-105"
      >
        <Icons.logo className="h-6 w-6" />
        <span className="font-bold hover:text-teal-600">{siteConfig.name}</span>
      </Link>
      <Link
        href={createHref("/about")}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === createHref("/about")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        {t("about")}
      </Link>
      <Link
        href={createHref("/blog")}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === createHref("/blog")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        Blog
      </Link>
      <Link
        href={createHref("/projects")}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === createHref("/projects")
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        {t("projects")}
      </Link>
    </nav>
  );
}
