import Link from "next/link";
import React from "react";

const AdminSideBarLinks = () => {
  return (
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
      <li>
        <Link
          href="/administrator/menus"
          className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition"
        >
          Menüler
        </Link>
      </li>
    </ul>
  );
};

export default AdminSideBarLinks;
