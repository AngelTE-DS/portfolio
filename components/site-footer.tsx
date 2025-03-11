"use client";
import { siteConfig } from "@/config/site";
import { Mail } from "lucide-react";
import { Icons } from "./icons";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();

  const locale = pathname.split("/")[1];

  const createHref = (path: string) => `/${locale}${path}`;

  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a
            target="_blank"
            rel="noreferrer"
            href="mailto:miulerbm00@gmail.com"
          >
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6 hover:scale-110" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            <span className="sr-only">GitHub</span>
            <Icons.gitHub className="h-6 w-6 hover:scale-110" />
          </a>
          <a target="_blank" rel="noreferrer" href={siteConfig.links.linkedin}>
            <span className="sr-only">LinkedIn</span>
            <Icons.linkedin className="h-6 w-6 hover:scale-110" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground hover:scale-110">
          <a href={createHref("/about")}>{siteConfig.author}</a>
        </div>
      </div>
    </footer>
  );
}
