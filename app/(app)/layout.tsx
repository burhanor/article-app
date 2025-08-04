import { ArticleSidebar } from "@/components/article/articleSidebar/articleSidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 my-5">
        <main className="flex-1 ">{children}</main>

        <ArticleSidebar />
      </div>
    </>
  );
}
