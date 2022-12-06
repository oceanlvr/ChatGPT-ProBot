const search = require('./src/client.js')
const commands = require('probot-commands-pro')

module.exports = (app) => {
  commands(app, 'ping', async (context) => {
    const issueComment = context.issue({
      body: 'pong',
    })
    return await context.octokit.issues.createComment(issueComment)
  })

  app.on(['issues.opened', 'issues.edited'], async (context) => {
    if (context.isBot)
      return
    const { issue } = context.payload
    // if the robot is mentioned in the issue body, reponse with a greeting
    if (
      issue
      && issue.body
      && issue.body.includes(`/chatgpt`)
    ) {
      const response = await search(issue.body)
      const issueComment = context.issue({
        body: response,
      })
      return await context.octokit.issues.createComment(issueComment)
    }
  })
  app.on(['issue_comment.created'], async (context) => {
    if (context.isBot)
      return
    const { comment } = context.payload
    // if the robot is mentioned in the issue body, reponse with a greeting
    if (
      comment
      && comment.body
      && comment.body.includes(`/chatgpt`)
    ) {
      const response = await search(comment.body)
      const issueComment = context.issue({
        body: response,
      })
      return await context.octokit.issues.createComment(issueComment)
    }
  })
};
