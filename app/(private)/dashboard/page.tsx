"use server";

import { getAllRecordsAction } from "@/actions/record/get-all-records-action";
import Chart from "@/components/Chart";
import RecordFormSection from "@/components/RecordFormSection";

export default async function DashboardPage() {
  const response = await getAllRecordsAction();
  return (
    <main className="space-y-6">
      <h1>Dasboard</h1>
      <Chart data={response?.records || []} />
      <RecordFormSection />
    </main>
  );
}
