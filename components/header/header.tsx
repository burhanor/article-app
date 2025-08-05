"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Mountain, Search, X } from "lucide-react";
import Profile from "./profile";
import { useRouter } from "next/navigation";

export default function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  // Ekran boyutu değiştiğinde mobil arama durumunu sıfırlamak için useEffect
  useEffect(() => {
    const handleResize = () => {
      // Tailwind'in 'md' breakpoint'i genellikle 768px'tir.
      // Ekran genişliği 768px veya daha büyükse mobil aramayı kapat.
      if (window.innerWidth >= 768) {
        setShowMobileSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Bileşen kaldırıldığında event listener'ı temizle
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const router = useRouter();
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = (event.currentTarget.elements[0] as HTMLInputElement).value;
    if (query) {
      router.push(`/ara?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full  bg-slate-800 text-white px-4 py-3 md:px-6">
      <div className="container flex h-14 items-center justify-between mx-auto">
        <Link
          href="/"
          className={`flex items-center gap-2 font-semibold ${
            showMobileSearch ? "hidden" : "flex"
          } md:flex`}
        >
          <Mountain className="h-6 w-6" />
          <span>Acme Inc</span>
        </Link>

        <div
          className={`relative flex-1 ${
            showMobileSearch ? "block" : "hidden"
          } md:block mx-4 max-w-md`}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Ara..."
              className="w-full text-black rounded-lg bg-muted pl-9 pr-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </form>
          {showMobileSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden"
              onClick={toggleMobileSearch}
            >
              <X className="h-5 w-5 text-slate-800" />
              <span className="sr-only">Aramayı kapat</span>
            </Button>
          )}
        </div>

        <nav
          className={`flex items-center gap-4 ${
            showMobileSearch ? "hidden" : "flex"
          } md:flex`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileSearch}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Aramayı aç</span>
          </Button>
          <Profile />
        </nav>
      </div>
    </header>
  );
}
