const { createNodeMiddleware, createProbot } = require("probot");
const app = require("../../../dist/index.js");
module.exports = createNodeMiddleware(app, {
  probot: createProbot({
    overrides: {
      privateKey: Buffer.from(process.env.PRIVATE_KEY, "base64").toString(),
    }
  }),
  webhooksPath: "/api/github/webhooks",
});
