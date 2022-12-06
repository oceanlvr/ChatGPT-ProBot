const { createNodeMiddleware, createProbot } = require("probot");
const app = require("../../../dist/index.js");
module.exports = createNodeMiddleware(app, {
  probot: createProbot({
    defaults: {
      appId: process.env.APP_ID,
      privateKey: process.env.PRIVATE_KEY,
      secret: process.env.WEBHOOK_SECRET,
    }
  }),
  webhooksPath: "/api/github/webhooks",
});
