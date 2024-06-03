import cron from "node-cron";
import cleanEmailNotification from "../utils/cleanEmailNotification.js";

cron.schedule("0 * * * *", () => {
  console.log("Running the cleanup task for delete old email notifications");
  cleanEmailNotification();
});
// cleanEmailNotification();

export default cron;
