const { createNodeMiddleware, createProbot } = require("probot");
const dotenv = require("dotenv")
const app = require("../../../dist/index.js");
const { APP_ID, WEBHOOK_SECRET, PRIVATE_KEY } = dotenv.config({ path: '../../../.env' }).parsed
module.exports = createNodeMiddleware(app, {
  probot: createProbot({
    defaults: {
      appId: APP_ID,
      privateKey: PRIVATE_KEY,
      secret: WEBHOOK_SECRET,
    }
  }),
  webhooksPath: "/api/github/webhooks",
});
