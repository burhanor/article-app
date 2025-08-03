import AdminSidebar from "@/components/adminSideBar/adminsidebar";

export default function AdministratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-24 min-h-[calc(100vh-96px)]">
      <div className="col-span-2 lg:block hidden h-full ">
        <AdminSidebar />
      </div>
      <main className="col-span-24 lg:col-span-22 p-4 bg-gray-100 h-full">
        {children}
      </main>
    </div>
  );
}
