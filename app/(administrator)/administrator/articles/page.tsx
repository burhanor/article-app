import { getSeoMetadata } from "@/lib/utils";
import ClientPage from "./clientPage";
export function generateMetadata() {
  return getSeoMetadata("administrator.articles");
}
export default function ArticlesPage() {
  return <ClientPage />;
}
