"use client";

import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function NotFoundPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ara?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold text-slate-300 select-none">
            404
          </h1>
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">
              Sayfa Bulunamadı
            </h2>
            <p className="text-slate-600 text-lg max-w-md mx-auto">
              <span className="font-mono text-sm bg-slate-200 px-2 py-1 rounded">
                {pathname}
              </span>{" "}
              sayfası mevcut değil, taşınmış veya silinmiş olabilir.
            </p>
          </div>
        </div>

        {/* Search Box */}
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-slate-700">
                <Search className="w-5 h-5" />
                <span className="font-medium">Arama yapın</span>
              </div>
              <form onSubmit={handleSearch} className="flex space-x-2">
                <Input
                  placeholder="Ne arıyorsunuz?"
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </Button>
        </div>

        {/* Go Back Link */}
        <div className="pt-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-8 border-t border-slate-200 max-w-lg mx-auto">
          <p className="text-sm text-slate-500">
            Eğer bu sayfaya bir bağlantı aracılığıyla ulaştıysanız, lütfen site
            yöneticisi ile iletişime geçin.
          </p>
        </div>
      </div>
    </div>
  );
}
