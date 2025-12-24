import ChartSection from "@/components/ChartSection";
import RecordFormSection from "@/components/RecordFormSection";

export default function DashboardPage() {
  return (
    <main className="space-y-6">
      <h1>Dasboard</h1>
      <ChartSection />
      <RecordFormSection />
    </main>
  );
}
