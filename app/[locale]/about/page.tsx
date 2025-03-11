"use client";

import Timeline from "@/components/timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AboutPage() {
  const t = useTranslations();
  const locale = usePathname();

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div>
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-x-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              {t("aboutMe")}
            </h1>
          </div>
        </div>
        <hr className="my-8" />
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="min-w-52 max-w-48 flex flex-col gap-2">
            <Avatar className="h-48 w-52">
              <AvatarImage src="/avatar.png" alt={siteConfig.author} />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-center break-words">
              {siteConfig.fullName}
            </h2>
            <p className="text-muted-foreground text-center break-words">
              {siteConfig.job}
            </p>
          </div>
          <p className="text-muted-foreground text-lg text-pretty py-4 self-center">
            {t("aboutDescription")}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-x-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl ">
              {t("myExperience")}
            </h1>
          </div>
        </div>
        <hr className="my-8" />
        <Timeline />
        <hr className="my-8" />
        <div className="flex flex-row justify-center">
          <Link
            target="_blank"
            href={
              locale.includes("/en")
                ? "https://drive.google.com/file/d/1mPAxMKi1W5rXFAjojRBVLVBJrM8mCbax/view?usp=sharing"
                : "https://drive.google.com/file/d/10jl-CdMvsHR9aKCWmI3I9teTF-71ppDR/view?usp=drive_link"
            }
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-fit hover:scale-105"
            )}
          >
            {t("getMyCV")}
          </Link>
        </div>
      </div>
    </div>
  );
}
