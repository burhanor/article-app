import ArticleCard from "@/components/article/articleCard/articleCard";
import PaginationComponent from "@/components/pagination/pagination";
import { getArticleByPage } from "@/services/articleService";

export default async function HomePagePagination({
  params,
}: {
  params: { sayfa: number };
}) {
  const { sayfa } = await params;
  const articles = await getArticleByPage("", sayfa, 10);
  console.log("Fetched articles:", articles);
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {articles.items.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <PaginationComponent paginationData={articles} key={"a"} />
      </div>
    </>
  );
}
