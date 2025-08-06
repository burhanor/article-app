import ArticleCard from "@/components/article/articleCard/articleCard";
import PaginationComponent from "@/components/pagination/pagination";
import { getArticleByPage } from "@/services/articleService";
import seoData from "@/data/seo.json";
import { Metadata } from "next";

type Props = {
  params: Promise<{ sayfa: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = seoData["homepage"];
  const p = await params;
  return {
    title: p.sayfa + data.title,
    description: data.description,
    keywords: data.keywords,
  };
}

export default async function HomePagePagination({ params }: Props) {
  const p = await params;
  const page = parseInt(p.sayfa || "1", 10);
  const articles = await getArticleByPage("", page, 10);
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
