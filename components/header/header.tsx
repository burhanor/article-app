import Image from "next/image";
import SearchBar from "../searchBar/searchBar";
import Logo from "@/public/panda.png";
import Link from "next/link";
import Profile from "./profile";
import { fetchMenuItems } from "@/services/menuItemService";
export default async function Header() {
  const menuItems = await fetchMenuItems();

  return (
    <header className="bg-gray-800 text-white p-4 fixed h-24 w-full z-2000">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src={Logo} alt="Logo" className="h-8 w-8 mr-4" />
          <h1 className="text-2xl font-bold ml-2">Article App</h1>
        </Link>
        <SearchBar />
      </div>
      <div className="mt-2 flex justify-between items-center">
        <div className="flex space-x-4">
          {menuItems &&
            menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="text-white hover:text-gray-300 transition-colors"
                title={item.description}
              >
                {item.title}
              </Link>
            ))}
        </div>
        <Profile />
      </div>
    </header>
  );
}
