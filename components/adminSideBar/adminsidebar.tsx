import AdminSideBarLinks from "./adminsidebarLinks";

export default function AdminSidebar() {
  return (
    <aside className=" bg-gray-800 text-white flex flex-col pb-6 py-2 h-full">
      <nav style={{ position: "fixed", top: "96px" }} className="w-1/12">
        <AdminSideBarLinks />
      </nav>
    </aside>
  );
}
