"use client";

import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "./ui/badge";
import { usePathname } from "next/navigation";

// What slugger does: rehype pretty => (rehype-pretty)

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
}

export function Tag({ tag, current, count }: TagProps) {
  const pathname = usePathname();

  const locale = pathname.split("/")[1];

  const createHref = (path: string) => `/${locale}${path}`;

  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={createHref("/tags/" + `${slug(tag)}`)}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  );
}
