import { getSeoMetadata } from "@/lib/utils";
import ClientPage from "./clientPage";
export function generateMetadata() {
  return getSeoMetadata("administrator.categories");
}
export default function CategoriesPage() {
  return <ClientPage />;
}
