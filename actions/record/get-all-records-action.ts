import { getDrizzleErrorMessage } from "@/lib/db/get-drizzle-error-message";
import { getAllRecords } from "@/lib/db/record/get-all-records";
import { verifySession } from "@/lib/session/verify-session";
import { GetAllRecordsState } from "@/lib/types";
import { DrizzleQueryError } from "drizzle-orm";
import { logoutUserAction } from "../auth/logout-user-action";
import { redirect, RedirectType } from "next/navigation";
import { PublicRoutes } from "@/lib/enums";

export const getAllRecordsAction = async (): Promise<GetAllRecordsState> => {
  try {
    const { firebaseUserId } = await verifySession();

    if (!firebaseUserId) {
      throw Error("logout");
    }

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

    if (error instanceof Error && error.message === "logout") {
      await logoutUserAction();
      redirect(PublicRoutes.Login, RedirectType.replace);
    }

    console.log("Unexpected get all records error", error);

    return {
      success: false,
      message: "Unexpected get all records error",
    };
  }
};
