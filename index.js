const search = require('./src/client.js')
const commands = require('probot-commands-pro')
// import commands from 'probot-commands-pro'
// import search from './src/client.js'

module.exports = (app) => {
  // commands(app, 'chatgpt', async (context, command) => {
  //   const prompt = command.arguments
  //   const response = await search(prompt)
  //   const issueComment = context.issue({
  //     body: response,
  //   })
  //   await context.octokit.issues.createComment(issueComment)
  // })

  commands(app, 'ping', async (context) => {
    const issueComment = context.issue({
      body: 'pong',
    })
    await context.octokit.issues.createComment(issueComment)
  })

  app.on(['issues.created', 'issues.edited'], async (context) => {
    if (context.isBot)
      return
    const { issue } = context.payload
    // if the rebot is mentioned in the issue body, reponse with a greeting
    if (
      issue
      && issue.body
      && issue.body.includes(`/chatgpt`)
    ) {
      const response = await search(issue.body)
      const issueComment = context.issue({
        body: response,
      })
      await context.octokit.issues.createComment(issueComment)
    }
  })
  app.on(['issue_comment.created'], async (context) => {
    if (context.isBot)
      return
    const { comment } = context.payload
    // if the rebot is mentioned in the issue body, reponse with a greeting
    if (
      comment
      && comment.body
      && comment.body.includes(`/chatgpt`)
    ) {
      const response = await search(comment.body)
      const issueComment = context.issue({
        body: response,
      })
      await context.octokit.issues.createComment(issueComment)
    }
  })
};
