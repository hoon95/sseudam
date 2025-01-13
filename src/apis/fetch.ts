import { fetchPetData } from "./pet";
import cron from "node-cron";

cron.schedule(
  "* * * * *",
  async () => {
    try {
      await fetchPetData();
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  },
  { scheduled: true, timezone: "Asia/Seoul" },
);
