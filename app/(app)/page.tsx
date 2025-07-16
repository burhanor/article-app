import seoData from "@/data/seo.json";

export async function generateMetadata() {
  const data = seoData["homepage"];

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
  };
}

export default function Home() {
  return <div>Burası Homepage</div>;
}
