import { getDrizzleErrorMessage } from "@/lib/db/get-drizzle-error-message";
import { getAllRecords } from "@/lib/db/record/get-all-records";
import { GetAllRecordsState } from "@/lib/types";
import { DrizzleQueryError } from "drizzle-orm";

export const getAllRecordsAction = async (): Promise<GetAllRecordsState> => {
  try {
    const allRecords = await getAllRecords();

    const yesCount = allRecords.filter((record) => record.vaccinated).length;
    const noCount = allRecords.length - yesCount;

    return {
      success: true,
      records: [
        { name: "Yes", count: yesCount },
        { name: "No", count: noCount },
      ],
    };
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      return {
        success: false,
        message: getDrizzleErrorMessage(error),
      };
    }

    console.log("Unexpected get all records error", error);

    return {
      success: false,
      message: "Unexpected get all records error",
    };
  }
};
