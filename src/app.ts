import "./utils/env"
import { App, LogLevel} from '@slack/bolt';
import { mapDataForDisplay} from "./services/news.service"
import { workFlowStep } from "./listeners/steps/workflow_step";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

app.use(async ({ next }) => {
  await next();
});
// code here ....

app.event('app_home_opened', async ({ event, client, logger }) => {
    try {
      const blocks = await mapDataForDisplay();
      // Call views.publish with the built-in client
      const result = await client.views.publish({
        // Use the user ID associated with the event
        user_id: event.user,
        view: {
          // Home tabs must be enabled in your app configuration page under "App Home"
          type: "home",
          blocks: []
        }
      });
  
      logger.info(result);
    }
    catch (error) {
      logger.error(error);
    }
  });

app.step(workFlowStep);



(async () => {
    // Start your app
    await app.start(Number(process.env.PORT) || 3000);
  
    console.log(`⚡️ Bolt app is running at ${process.env.PORT}!`);
})();