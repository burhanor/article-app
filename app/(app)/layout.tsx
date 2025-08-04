import CategorySection from "@/components/categorySection/categorySection";
import MostViewedArticle from "@/components/mostViewedArticle/mostViewedArticle";
import TopRatedArticle from "@/components/topRatedArticle/topRatedArticle";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6">
        <main className="flex-1 my-5">{children}</main>
        <aside
          id="rightSideBar"
          className="w-full md:w-64 md:shrink-0 md:order-none order-last mt-6 md:mt-0"
        >
          <CategorySection />
          <TopRatedArticle />
          <MostViewedArticle />
        </aside>
      </div>
    </>
  );
}
