import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getMostViewedArticles,
  getTopRatedArticles,
} from "@/services/articleService";
import categoryService from "@/services/categoryService";

export async function ArticleSidebar() {
  const mostVotedArticles = await getTopRatedArticles();
  const mostReadArticles = await getMostViewedArticles();
  const categories = await categoryService.fetchAll();
  return (
    <aside className="w-full lg:w-80 space-y-6 p-4 me-25 lg:p-0">
      {/* Kategoriler Kartı */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kategoriler</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/kategori/${category.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* En Çok Okunan Makaleler Kartı */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">En Çok Okunan Makaleler</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mostReadArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/makale/${article.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors wrap-anywhere"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* En Çok Oylanan Makaleler Kartı */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">En Çok Oylanan Makaleler</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mostVotedArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/makale/${article.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors wrap-anywhere"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
