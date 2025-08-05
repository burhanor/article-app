import { MenuType } from "@/enums/MenuType";

const menuTypeClasses: Record<MenuType, string> = {
  [MenuType.Header]: "bg-yellow-100 text-yellow-800",
  [MenuType.Footer]: "bg-green-100 text-green-800",
  [MenuType.Sidebar]: "bg-red-100 text-gray-800",
  [MenuType.Custom]: "bg-blue-100 text-gray-800",
  [MenuType.Category]: "bg-purple-100 text-purple-800",
};

const menuTypeText: Record<MenuType, string> = {
  [MenuType.Header]: "Header",
  [MenuType.Footer]: "Footer",
  [MenuType.Sidebar]: "Sidebar",
  [MenuType.Custom]: "Özel",
  [MenuType.Category]: "Kategori",
};

export default function MenuTypeBadge({ menuType }: { menuType: MenuType }) {
  const className = menuTypeClasses[menuType] ?? "bg-gray-100 text-gray-800";
  const text = menuTypeText[menuType] ?? "Bilinmiyor";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {text}
    </span>
  );
}
