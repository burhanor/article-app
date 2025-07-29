import { getSeoMetadata } from "@/lib/utils";
import ClientPage from "./clientPage";
export function generateMetadata() {
  return getSeoMetadata("administrator.tags");
}
export default function TagPage() {
  return <ClientPage />;
}
