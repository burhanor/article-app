interface SearchPageProps {
  searchParams: { q: string };
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  return <div>Arama sonucu: {q}</div>;
}
