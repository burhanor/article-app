export default function ArticlePage({ params }: { params: { slug: string } }) {
  return <div>ArticlePage - {params.slug}</div>;
}
