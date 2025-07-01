export default function CategoriesPage({
  params,
}: {
  params: { slug: string };
}) {
  return <div>CategoriesPage - {params.slug}</div>;
}
