"use client";

import { postsEn, postsEs } from "#site/content";
import { PostItem } from "@/components/post-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  const posts = pathname.includes("/es") ? postsEs : postsEn;

  // Asegurarse de que posts no sea undefined
  const sortedPosts = posts ? sortPosts(posts) : [];

  const latestPosts = sortedPosts!.slice(0, 5);
  const t = useTranslations();

  const locale = pathname.split("/")[1];

  const createHref = (path: string) => `/${locale}${path}`;

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
        <div className="container flex flex-col gap-4 text-center">
          {/* Contenedor de la imagen */}
          {/* <div className="flex justify-center mt-0">
            <Image
              className="rounded-lg object-cover w-1/2 h-auto max-w-2xl"
              priority={true}
              alt="GopeApp"
              src="/images/avatar.png"
              height={288}
              width={512}
            />
            
          </div> */}
          <div className="flex justify-center mt-0">
            <Avatar className="h-48 w-52">
              <AvatarImage src="/avatar.png" alt={siteConfig.author} />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            {t("helloIAm")}
            <div className="hover:text-teal-600 inline-block">
              <a href={createHref("/about")}>Angel Terrones E.</a>
            </div>
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            {t("miulerDescription")}
          </p>
          {/* Texto adicional "Acerca de mí" */}
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            <a href={createHref("/about")} className="hover:text-teal-600">
              {t("moreAboutMe")}
            </a>
          </p>
          {/* Botones */}
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link
              href={createHref("/blog")}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-fit hover:scale-105"
              )}
            >
              {t("visitMyBlog")}
            </Link>
            <Link
              href={createHref("/projects")}
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit hover:scale-105"
              )}
            >
              {t("projects")}
            </Link>
          </div>
        </div>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          {t("latestPosts")}
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            <li key={post.slug} className="first:border-t first:border-border">
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
