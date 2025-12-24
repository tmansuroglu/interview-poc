"use server";

import { getAllRecordsAction } from "@/actions/record/get-all-records-action";
import Chart from "./Chart";

export default async function ChartSection() {
  const response = await getAllRecordsAction();

  return <Chart data={response?.records || []} />;
}
