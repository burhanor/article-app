"use client";
import AdminSidebar from "@/components/adminSideBar/adminsidebar";
import AdminSideBarLinks from "@/components/adminSideBar/adminsidebarLinks";
import { Menu, X } from "lucide-react";
import React from "react";

export default function AdministratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="block lg:hidden bg-gray-800">
        <div className="flex justify-end">
          <button
            className="p-2 rounded bg-gray-800 text-white shadow"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
        {open && (
          <div className="fixed inset-0 text-white flex flex-col p-8  z-5000 lg:z-0 bg-gray-800">
            <button
              className="self-end mb-4 p-2"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>
            <nav className="flex flex-col gap-6 text-xl ">
              <AdminSideBarLinks />
            </nav>
          </div>
        )}
      </div>
      <div className="grid grid-cols-24 min-h-[calc(100vh-96px)]">
        <div className="col-span-2 lg:block hidden h-full ">
          <AdminSidebar />
        </div>
        <main className="col-span-24 lg:col-span-22 p-4 bg-gray-100 h-full">
          {children}
        </main>
      </div>
    </>
  );
}
