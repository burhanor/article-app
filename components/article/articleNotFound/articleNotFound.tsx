import { Search, FileX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getMenuItemsByType } from "@/services/menuItemService";
import { MenuType } from "@/enums/MenuType";
import Link from "next/link";

export default async function ArticleNotFound() {
  const categories = await getMenuItemsByType(MenuType.Category);
  return (
    <div className=" bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full h-full max-w-4xl mx-auto shadow-lg border-0 animate-in fade-in-0 mt-20 ">
        <CardContent className="p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4 animate-in  ">
              <FileX className="w-12 h-12 md:w-16 md:h-16 text-slate-400" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 animate-in fade-in-0 ">
            Makale Bulunamadı
          </h1>

          <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed animate-in fade-in-0 ">
            Aradığınız kriterlere uygun makale bulunamadı. Farklı anahtar
            kelimeler deneyebilir veya arama filtrelerinizi değiştirebilirsiniz.
          </p>

          {/* Suggestions */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left animate-in fade-in-0  ">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
              <Search className="w-4 h-4 mr-2 text-slate-600" />
              Arama Önerileri
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Daha genel anahtar kelimeler kullanmayı deneyin
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Yazım hatalarını kontrol edin
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Farklı kelime kombinasyonları deneyin
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Kategori filtrelerini kaldırın
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="mt-8 pt-6 border-t border-slate-200 ">
            <p className="text-sm text-slate-500 mb-3">Popüler Kategoriler</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Link
                  href={`/${category.link}`}
                  key={category.id}
                  className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
