import { getSeoMetadata } from "@/lib/utils";
import ClientPage from "./clientPage";
export function generateMetadata() {
  return getSeoMetadata("administrator.users");
}
export default function UserPage() {
  return <ClientPage />;
}
