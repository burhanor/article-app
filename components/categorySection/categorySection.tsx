import { Category } from "@/models/Category";
import Link from "next/link";

export default function CategorySection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="bg-gray-100 p-4 rounded-lg shadow-md  mt-5">
      <h2 className="text-xl font-semibold mb-4">Kategoriler</h2>
      <ul className="space-y-2">
        {[...categories]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => (
            <li
              key={category.id}
              className=" bg-white rounded hover:bg-gray-200 transition-colors"
            >
              <Link
                href={`/kategori/${category.slug}`}
                className="text-blue-600  block truncate p-2"
                title={category.name}
              >
                {category.name}
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
