"use client";

import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = (event.currentTarget.elements[0] as HTMLInputElement).value;
    if (query) {
      router.push(`/ara?q=${encodeURIComponent(query)}`);
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Ara..."
          className="px-3 py-1 rounded bg-gray-700 text-white focus:outline-none"
        />
      </form>
    </div>
  );
}
