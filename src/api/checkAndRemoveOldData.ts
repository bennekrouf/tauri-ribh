// import { Store } from "tauri-plugin-store-api";
import { Logger } from 'mayo-logger';
// import { useVerifiedUser } from "../hooks/useVerifiedUser";
// import { lessonsPrefix } from "./lessonsPrefix";
import { loadFromStore } from "../hooks/loadFromStore";
import { flushStorage } from "../hooks/flushStorage";

const MONTH_DURATION = 1;
// const MAX_STORED_LESSONS = 20;

export const checkAndRemoveOldData = async () => {
  // const user = useVerifiedUser();
  try {
    const storedDateString = await loadFromStore('lessons_dates');

    if (!storedDateString) {
      // No stored date found, so we can exit
      return;
    }

    const storedDate = new Date(storedDateString);
    const currentDate = new Date();
    const differenceInMonths = ((currentDate.getFullYear() - storedDate.getFullYear()) * 12) + (currentDate.getMonth() - storedDate.getMonth());

    if (differenceInMonths > MONTH_DURATION) {
      flushStorage();
    }
  } catch (error) {
    Logger.error("Error checking and removing old lessons:", error, { tag: 'checkAndRemoveOldData' });
  }
};
