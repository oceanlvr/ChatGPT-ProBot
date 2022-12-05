const { createNodeMiddleware, createProbot } = require("probot");

const app = require("../../../dist/index");

module.exports = createNodeMiddleware(app, {
  probot: createProbot(),
  webhooksPath: "/api/github/webhooks",
});
