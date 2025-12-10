/*
Auth check and redirect added by Isaac
*/

import { auth } from "@/auth"
import { redirect } from "next/navigation";
import Dashboard from '@/components/Dashboard';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
      redirect("/");
  }

  return (
    <Dashboard />
  );

}

