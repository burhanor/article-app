import ArticleDetail from "@/components/article/articleDetail/articleDetail";
import { articleIsExist } from "@/services/articleService";
import { notFound } from "next/navigation";

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
