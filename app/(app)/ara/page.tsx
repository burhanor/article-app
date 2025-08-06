import ArticleCard from "@/components/article/articleCard/articleCard";
import ArticleNotFound from "@/components/article/articleNotFound/articleNotFound";
import PaginationComponent from "@/components/pagination/pagination";
import { getArticleByPage } from "@/services/articleService";
import seoData from "@/data/seo.json";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{
    q: string;
    [sayfa: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const p = await searchParams;
  const data = seoData["search"];
  const query = p.q || "";
  return {
    title: data.title,
    description: data.description,
    keywords: `${data.keywords}, ${query}`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const p = await searchParams;
  const sp = await searchParams;
  const q = p.q || "";
  const sayfa = sp.sayfa
    ? Array.isArray(sp.sayfa)
      ? sp.sayfa[0]
      : sp.sayfa
    : "1";

  const page = parseInt(sayfa || "1", 10);
  const validPage = isNaN(page) || page < 1 ? 1 : page;

  const articles = await getArticleByPage(q, validPage, 10);

  if (!articles || articles.items.length === 0) {
    return <ArticleNotFound />;
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-6">
        {articles.items.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <PaginationComponent
        paginationData={articles}
        url={`ara?q=${encodeURIComponent(q)}`}
        paginationParam="&sayfa="
      />
    </div>
  );
}
