export default async function CategoriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return <div>CategoriesPage - {slug}</div>;
}
