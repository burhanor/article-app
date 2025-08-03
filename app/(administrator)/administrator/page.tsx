"use server";
import { getSeoMetadata } from "@/lib/utils";
import AdministratorDashboardClient from "./clientPage";
export async function generateMetadata() {
  return getSeoMetadata("administrator.dashboard");
}
export default async function AdministratorDashboard() {
  return <AdministratorDashboardClient />;
}
