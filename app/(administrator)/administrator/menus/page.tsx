import { getSeoMetadata } from "@/lib/utils";
import ClientPage from "./clientPage";
export function generateMetadata() {
  return getSeoMetadata("administrator.menus");
}
export default function MenuPage() {
  return <ClientPage />;
}
