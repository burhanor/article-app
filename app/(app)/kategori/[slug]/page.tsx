import ArticleCard from "@/components/article/articleCard/articleCard";
import PaginationComponent from "@/components/pagination/pagination";
import { getArticlesBySlug } from "@/services/articleService";
import { categoryIsExist } from "@/services/categoryService";
import { notFound } from "next/navigation";
import seoData from "@/data/seo.json";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    [sayfa: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const data = seoData["categories"];
  const p = await params;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords + `, ${p.slug}`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoriesPage({ params, searchParams }: Props) {
  const p = await params;
  const sp = await searchParams;
  const page = sp.sayfa
    ? Array.isArray(sp.sayfa)
      ? sp.sayfa[0]
      : sp.sayfa
    : "1";
  const slug = p.slug;
  const sayfa = parseInt(page || "1", 10);

  const exists = await categoryIsExist(slug);

  if (!exists) {
    notFound();
  }
  const articles = await getArticlesBySlug(slug, sayfa, 10);

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
          url={`kategori/${slug}`}
          paginationParam="?sayfa="
        />
      </div>
    </>
  );
}
