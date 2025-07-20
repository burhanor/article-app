import AdminSidebar from "@/components/adminSideBar/adminsidebar";

export default function AdministratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside>
        <AdminSidebar />
      </aside>
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
}
