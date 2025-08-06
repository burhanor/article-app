import ArticleCard from "@/components/article/articleCard/articleCard";
import PaginationComponent from "@/components/pagination/pagination";
import { getArticlesByAuthor } from "@/services/articleService";
import { userIsExist } from "@/services/userService";
import { notFound } from "next/navigation";
import seoData from "@/data/seo.json";

type Props = {
  params: Promise<{ nickname: string }>;
  searchParams: Promise<{
    [sayfa: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const data = seoData["authors"];
  const p = await params;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords + `, ${p.nickname}`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const p = await params;
  const sp = await searchParams;
  const nickname = p.nickname;
  const page = sp.sayfa
    ? Array.isArray(sp.sayfa)
      ? sp.sayfa[0]
      : sp.sayfa
    : "1";
  const sayfa = parseInt(page || "1", 10);

  const exists = await userIsExist(nickname);

  if (!exists) {
    notFound();
  }
  const articles = await getArticlesByAuthor(nickname, sayfa, 10);
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
          url={`yazar/${nickname}`}
          paginationParam="?sayfa="
        />
      </div>
    </>
  );
}
