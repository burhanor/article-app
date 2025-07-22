import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className=" bg-gray-800 text-white flex flex-col pb-6 py-2 h-full">
      <nav style={{ position: "fixed", top: "96px" }}>
        <ul>
          <li>
            <Link
              href="/administrator/users"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Kullanıcılar
            </Link>
          </li>
          <li>
            <Link
              href="/administrator/categories"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Kategoriler
            </Link>
          </li>
          <li>
            <Link
              href="/administrator/tags"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Etiketler
            </Link>
          </li>
          <li>
            <Link
              href="/administrator/articles"
              className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              Makaleler
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
