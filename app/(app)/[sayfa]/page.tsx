import ArticleCard from "@/components/article/articleCard/articleCard";
import PaginationComponent from "@/components/pagination/pagination";
import { getArticleByPage } from "@/services/articleService";
import seoData from "@/data/seo.json";

export async function generateMetadata() {
  const data = seoData["homepage"];

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
  };
}

export default async function HomePagePagination({
  params,
}: {
  params: { sayfa: number };
}) {
  const { sayfa } = await params;
  const articles = await getArticleByPage("", sayfa, 10);
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
