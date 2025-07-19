import { getMostViewedArticles } from "@/services/articleService";
import Link from "next/link";

export default async function MostViewedArticle() {
  const mostViewedArticles = await getMostViewedArticles();
  return (
    <section className="bg-gray-100 p-4 rounded-lg shadow-md my-5">
      <h2 className="text-xl font-semibold mb-4">Most Viewed Articles</h2>
      <ul className="space-y-2">
        {[...mostViewedArticles]
          .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
          .map((article) => (
            <li
              key={article.slug}
              className="p-2 bg-white rounded hover:bg-gray-200 transition-colors"
            >
              <Link
                href={`/makale/${article.slug}`}
                className="text-blue-600 hover:underline block break-words"
                title={article.title}
              >
                {article.title}
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
