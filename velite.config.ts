import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";

const computedFieldsEn = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: "en/" + data.slug.split("/").slice(1).join("/"),
});

const computedFieldsEs = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: "es/" + data.slug.split("/").slice(1).join("/"),
});

const postsEn = defineCollection({
  name: "PostEn",
  pattern: "en/blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    })
    .transform(computedFieldsEn),
});

const postsEs = defineCollection({
  name: "PostEs",
  pattern: "es/blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    })
    .transform(computedFieldsEs),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].ext",
    clean: true,
  },
  collections: { postsEn, postsEs },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "one-dark-pro" }],
      [
        rehypeAutoLinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
