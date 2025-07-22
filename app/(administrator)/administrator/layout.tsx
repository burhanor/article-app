import AdminSidebar from "@/components/adminSideBar/adminsidebar";

export default function AdministratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-96px)]">
      <aside className="">
        <AdminSidebar />
      </aside>
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
}
