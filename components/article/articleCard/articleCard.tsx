"use server";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ArticleDto } from "@/models/Article";
import { Status } from "@/enums/Status";
import { formatDate, getAvatarUrl } from "@/lib/utils";

interface ArticleCardProps {
  article: ArticleDto;
}

export default async function ArticleCard({ article }: ArticleCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const avatarSrc =
    getAvatarUrl(article.avatar) || "/placeholder.svg?height=40&width=40";

  return (
    <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 p-6 flex flex-col h-full hover:bg-gray-50">
      {/* Başlık */}
      <Link href={`/makale/${article.slug}`} className="block">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight wrap-anywhere hover:text-blue-600 transition-colors duration-200">
          {article.title}
        </h2>
      </Link>
      <div
        className="text-gray-700 text-base leading-relaxed mb-4 line-height-relaxed line-clamp-3 flex-grow"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
      {/* Kategoriler */}
      <div className="flex flex-wrap gap-2 mb-4">
        {article.categories
          .filter((m) => m.status === Status.Published)
          .map((category, index) => (
            <Link
              key={index}
              href={`/kategori/${category.slug}`}
              className="block h-full"
            >
              <Badge
                variant="secondary"
                className="text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
      </div>
      {/* Alt Bilgiler */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100 mt-auto">
        {" "}
        {/* Yazar Bilgileri */}
        <div className="flex items-center space-x-3">
          <Link
            href={`/yazar/${article.nickname}`}
            className="flex items-center space-x-3"
          >
            <Image
              src={avatarSrc || "/placeholder.svg"}
              alt={article.nickname}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-gray-800 font-medium">
              {article.nickname}
            </span>
          </Link>
        </div>
        {/* Tarih ve Görüntülenme */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(
                article.publishDate ? article.publishDate.toString() : null
              )}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{formatViews(article.info.viewCount)} görüntülenme</span>
          </div>
        </div>
      </div>
    </article>
  );
}
