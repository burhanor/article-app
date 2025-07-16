export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return <div>ArticlePage - {slug}</div>;
}
