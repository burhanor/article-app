import TopArticleDto from "@/models/TopArticleDto";
import Link from "next/link";

interface TopRatedArticleProps {
  articles: TopArticleDto[];
  title: string;
}

export default function TopRatedArticle(props: TopRatedArticleProps) {
  return (
    <section className="bg-gray-100 p-4 rounded-lg shadow-md my-5">
      <h2 className="text-xl font-semibold mb-4">{props.title}</h2>
      <ul className="space-y-2">
        {[...props.articles]
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
