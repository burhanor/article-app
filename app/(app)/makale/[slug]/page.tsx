import ArticleDetail from "@/components/article/articleDetail/articleDetail";
import { Status } from "@/enums/Status";
import { articleIsExist, getArticle } from "@/services/articleService";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const p = await params;
  const article = await getArticle(p.slug);
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

export default async function ArticlePage({ params }: Props) {
  const p = await params;

  const exists = await articleIsExist(p.slug);
  if (!exists) {
    notFound();
  }

  return (
    <div>
      <ArticleDetail slug={p.slug} />
    </div>
  );
}
