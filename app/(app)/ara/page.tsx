import ArticleCard from "@/components/article/articleCard/articleCard";
import ArticleNotFound from "@/components/article/articleNotFound/articleNotFound";
import PaginationComponent from "@/components/pagination/pagination";
import { getArticleByPage } from "@/services/articleService";
import seoData from "@/data/seo.json";

interface SearchPageProps {
  searchParams: { q: string; sayfa: number };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const data = seoData["search"];

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords + `, ${searchParams.q}`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, sayfa } = await searchParams;

  const articles = await getArticleByPage(q, sayfa < 1 ? 1 : sayfa, 10);
  if (!articles || articles.items.length === 0) {
    return <ArticleNotFound />;
  }
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {articles.items.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <PaginationComponent
          paginationData={articles}
          key={"a"}
          url={`ara?q=${q}`}
          paginationParam="&sayfa="
        />
      </div>
    </>
  );
}
