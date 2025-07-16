import CategorySection from "@/components/categorySection/categorySection";
import TopRatedArticle from "@/components/topRatedArticle/topRatedArticle";
import {
  getMostViewedArticles,
  getTopRatedArticles,
} from "@/services/articleService";
import { fetchCategories } from "@/services/categoryService";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategories();
  const mostViewedArticles = await getMostViewedArticles();
  const topRatedArticles = await getTopRatedArticles();
  console.log("Kategoriler:", categories);
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6">
        <main className="flex-1">{children}</main>
        <aside
          id="rightSideBar"
          className="w-full md:w-64 md:shrink-0 md:order-none order-last mt-6 md:mt-0"
        >
          <CategorySection categories={categories} />
          <TopRatedArticle
            articles={topRatedArticles}
            title="Top Rated Articles"
          />
          <TopRatedArticle
            articles={mostViewedArticles}
            title="Most Viewed Articles"
          />
        </aside>
      </div>
    </>
  );
}
