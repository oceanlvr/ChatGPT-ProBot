const { createNodeMiddleware, createProbot } = require("probot");
const app = require("../../../dist/index.js");
module.exports = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: "/api/github/webhooks",
});
