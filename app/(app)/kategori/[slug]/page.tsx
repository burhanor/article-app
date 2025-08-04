import ArticleCard from "@/components/article/articleCard/articleCard";
import PaginationComponent from "@/components/pagination/pagination";
import { getArticlesBySlug } from "@/services/articleService";
import { categoryIsExist } from "@/services/categoryService";
import { notFound } from "next/navigation";
interface PageProps {
  params: { slug: string };
  searchParams: { sayfa?: string };
}
export default async function CategoriesPage({
  params,
  searchParams,
}: PageProps) {
  const slug = params.slug; // "kategori-adi"
  const sayfa = parseInt(searchParams.sayfa || "1", 10); // 1 (varsayılan)

  const exists = await categoryIsExist(slug);
  if (!exists) {
    notFound();
  }
  const articles = await getArticlesBySlug(slug, sayfa, 10);

  return (
    <>
      <p>
        {slug}-{sayfa}
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
          url={`kategori/${slug}`}
          paginationParam="?sayfa="
        />
      </div>
    </>
  );
}
