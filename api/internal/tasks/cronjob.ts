import cron from "node-cron"
import { blogService } from "../service/blog"
import { config } from '../../../config'
export const startCheckingViews = cron.schedule(config.blogpost_view_schedule, async () => {
    await blogService.increaseViews();
});