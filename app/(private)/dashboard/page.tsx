import ChartSection from "@/components/ChartSection";
import RecordFormSection from "@/components/RecordFormSection";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <main className="space-y-6">
      <h1>Dasboard</h1>
      <Suspense fallback={"Loading chart.."}>
        <ChartSection />
      </Suspense>
      <RecordFormSection />
    </main>
  );
}
