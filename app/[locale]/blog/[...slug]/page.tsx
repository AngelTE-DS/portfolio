import { notFound } from "next/navigation";
import { postsEn, postsEs } from "#site/content";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import "@/styles/mdx.css";
import { MDXContent } from "@/components/mdx-components";
import { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string[];
    locale: string;
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const { slug, locale } = params;
  const slugStr = slug.join("/");

  const posts = locale === "es" ? postsEs : postsEn;
  const post = posts.find(
    (post) => post.slugAsParams === locale + "/blog/" + slugStr
  );

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_URL}images/og-blogpost.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale } = params;

  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
      <div>
        <a className="no-underline hover:underline" href={`/${locale}/blog`}>
          ←
        </a>
      </div>
    </article>
  );
}
