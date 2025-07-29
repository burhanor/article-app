"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";

const Profile = () => {
  const { isAuthenticated, image, name, clearToken } = useAuthStore();
  const router = useRouter();
  async function handleLogout() {
    try {
      const result = await Logout();
      if (result) {
        clearToken();
        router.push("/login");
      } else {
        // İstersen hata mesajı gösterebilirsin
        console.error("Logout başarısız.");
      }
    } catch (error) {
      console.error("Logout sırasında hata:", error);
    }
  }

  return (
    <>
      {isAuthenticated && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback className="bg-purple-700 text-white text-lg ">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/administrator" className="w-full">
                Admin Menüsü
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="w-full">
                Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={handleLogout}>Çıkış Yap</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default Profile;
