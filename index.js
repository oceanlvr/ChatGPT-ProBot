const { search, review, refactor } = require('./src/client.js')
const commands = require('probot-commands-pro')

module.exports = (app) => {
  commands(app, 'ping', async (context) => {
    const issueComment = context.issue({
      body: '🤖️: pong',
    })
    return await context.octokit.issues.createComment(issueComment)
  })

  commands(app, 'chatgpt', async (context) => {
    if (context.isBot)
      return
    const { comment, issue, sender } = context.payload
    const { body } = comment || issue
    const prompt = body.replace('/chatgpt', '').trim()
    const response = await search(prompt)
    const issueComment = context.issue({
      body: `@${sender.login} 🤖️: ${response}`,
    })
    return await context.octokit.issues.createComment(issueComment)
  })

  // WIP: review code from code & add test
  // https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue
  //['issue_comment.created', 'issue_comment.edited', 'issues.opened', 'issues.edited']

  // configure something
  app.on(['installation'], async (context) => { })

  app.on(['pull_request_review_comment.created'], async (context) => {
    if (context.isBot)
      return
    const { comment, sender } = context.payload
    const { body, diff_hunk } = comment
    const eventHandlerMap = {
      '/review': review,
      '/refactor': refactor,
    }
    const event = Object.keys(eventHandlerMap).find((key) => body.includes(key))
    if (!event) return

    const prompt = body.replace(event, '').trim()
    const response = await eventHandlerMap[event]({ prompt, lang: 'javascript', code: diff_hunk })
    const issueComment = context.issue({
      body: `@${sender.login} 🤖️: ${response}`,
    })
    return await context.octokit.issues.createComment(issueComment)
  })
};
