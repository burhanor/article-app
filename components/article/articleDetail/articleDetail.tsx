import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Eye, Heart, ThumbsDown, User } from "lucide-react";
import { getArticle } from "@/services/articleService";
import LikeDislikeButtons from "../likeDislikeButtons/likeDislikeButtons";
import { formatDate, getAvatarUrl } from "@/lib/utils";
import Link from "next/link";

interface ArticlePageProps {
  slug: string;
}

export default async function ArticlePage({ slug }: ArticlePageProps) {
  const article = await getArticle(slug);

  console.log("Article fetched:", article);
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 max-w-8xl">
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-6 pb-8">
            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 dark:text-slate-100">
              {article.title}
            </h1>

            {/* Author and Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-700">
                  <AvatarImage
                    src={getAvatarUrl(article.avatar)}
                    alt={article.nickname}
                  />

                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {article.nickname}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(
                        article.publishDate
                          ? article.publishDate.toString()
                          : null
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {article.info.viewCount.toLocaleString()} views
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-p:mb-4 break-words"
              style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Categories */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {article.categories.map((category) => (
                  <Link href={`/kategori/${category.slug}`} key={category.slug}>
                    <Badge
                      key={category.slug}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                    >
                      {category.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Article Stats and Actions */}
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{article.info.likeCount} likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-4 w-4 text-slate-500" />
                  <span>{article.info.dislikeCount} dislikes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span>{article.info.viewCount.toLocaleString()} views</span>
                </div>
              </div>

              {/* Like/Dislike Buttons */}
              <LikeDislikeButtons stats={article.info} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
