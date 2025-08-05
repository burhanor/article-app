import ArticleCard from "@/components/article/articleCard/articleCard";
import PaginationComponent from "@/components/pagination/pagination";
import { getArticlesByAuthor } from "@/services/articleService";
import { userIsExist } from "@/services/userService";
import { notFound } from "next/navigation";
interface PageProps {
  params: { nickname: string };
  searchParams: { sayfa?: string };
}
export default async function AuthorPage({ params, searchParams }: PageProps) {
  const nickname = await params.nickname;
  const sayfa = parseInt((await searchParams.sayfa) || "1", 10);

  const exists = await userIsExist(nickname);

  if (!exists) {
    notFound();
  }
  const articles = await getArticlesByAuthor(nickname, sayfa, 10);
  return (
    <>
      <p>
        {nickname}-{sayfa}
      </p>
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
