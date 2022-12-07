const { search, review, refactor } = require('./src/client.js')
const commands = require('probot-commands-pro')

module.exports = (app) => {
  commands(app, 'ping', async (context) => {
    const issueComment = context.issue({
      body: 'pong',
    })
    return await context.octokit.issues.createComment(issueComment)
  })

  commands(app, 'chatgpt', async (context) => {
    if (context.isBot)
      return
    const { comment, issue } = context.payload
    const { body } = comment || issue
    const prompt = body.replace('/chatgpt', '').trim()
    const response = await search(prompt)
    const issueComment = context.issue({
      body: response,
    })
    return await context.octokit.issues.createComment(issueComment)
  })

  // wip: review code from code & add test
  // https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue
  app.on('issues.opened', async (context) => { })
  // configure something
  app.on(['installation'], async (context) => { })

  // add test && review && refactor
  app.on(['pull_request_review_comment'], async (context) => {
    if (context.isBot)
      return
    const { comment } = context.payload
    const { body, diff_hunk } = comment || issue

    if (!body.includes(`/review`)) return
    const prompt = body.replace('/review', '').trim()
    const response = await review({ prompt, lang: 'javascript', code: diff_hunk })
    const issueComment = context.issue({
      body: response,
    })
    return await context.octokit.issues.createComment(issueComment)
  })

  // app.on(['issue_comment.created', 'issue_comment.edited', 'issues.opened', 'issues.edited'], async (context) => {
  //   if (context.isBot)
  //     return
  //   const { comment, issue } = context.payload
  //   const { body } = comment || issue
  //   if (!body.includes(`/chatgpt`)) return
  //   const prompt = body.replace('/chatgpt', '').trim()
  //   const response = await search(prompt)
  //   const issueComment = context.issue({
  //     body: response,
  //   })
  //   return await context.octokit.issues.createComment(issueComment)
  // })
};
