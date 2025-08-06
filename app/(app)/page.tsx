import ArticleCard from "@/components/article/articleCard/articleCard";
import PaginationComponent from "@/components/pagination/pagination";
import seoData from "@/data/seo.json";
import { getArticleByPage } from "@/services/articleService";

export async function generateMetadata() {
  const data = seoData["homepage"];

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home() {
  const articles = await getArticleByPage("", 1, 10);
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
