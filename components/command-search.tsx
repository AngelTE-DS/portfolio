import { postsEn, postsEs } from "#site/content";
import { StickyNote } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

interface CommandSearchProps {
  locale: string;
}

export default function CommandSearch({ locale }: CommandSearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const t = useTranslations();

  const posts = locale === "es" ? postsEs : postsEn;

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    router.push(`/${slug}`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "items-center text-muted-foreground flex-row justify-center align-middle border rounded-md hidden md:flex"
        )}
      >
        {t("searchPosts")}
        {"..."}
        <div className="border rounded ml-4 p-1 ">⌘K</div>
      </Button>
      {isOpen && (
        <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
          <CommandInput placeholder="Search posts" />
          <CommandGroup heading="Posts">
            <CommandEmpty>{t("noPostsFound")}</CommandEmpty>
            <CommandList>
              {posts.map((post) => (
                <CommandItem
                  key={post.slug}
                  onSelect={() => {
                    handleSelect(post.slug);
                  }}
                >
                  <StickyNote className="mr-2 h-4 w-4" />
                  <span>{post.title}</span>
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </CommandDialog>
      )}
    </>
  );
}
