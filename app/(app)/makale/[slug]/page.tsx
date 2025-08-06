import ArticleDetail from "@/components/article/articleDetail/articleDetail";
import { Status } from "@/enums/Status";
import { articleIsExist, getArticle } from "@/services/articleService";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  return {
    title: article.title,
    description: article.title,
    keywords: article.tags
      .filter((m) => m.status == Status.Published)
      .map((m) => m.name)
      .join(", "),
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: article.nickname }],
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const exists = await articleIsExist(slug);
  if (!exists) {
    notFound();
  }

  return (
    <div>
      <ArticleDetail slug={slug} />
    </div>
  );
}
