const { ChatGPTAPI } = require('@oceanlvr/chatgpt')
// const { ChatGPTAPI } = require('chatgpt')

const client = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN })

async function search(searchPrompt) {
  await client.ensureAuth()
  const reponse = await client.sendMessage(searchPrompt)
  return reponse
}

async function refactor({ code, lang, prompt }) {
  await client.ensureAuth()

  const searchPrompt = `Refactor folloing ${lang} code. Do not include example usage. ${prompt}.
  ${code}
`
  const reponse = await client.sendMessage(searchPrompt)
  return reponse
}

async function review({ code, lang, prompt }) {
  await client.ensureAuth()

  const searchPrompt = `Review folloing ${lang} code. ${prompt}.
  ${code}
`
  const reponse = await client.sendMessage(searchPrompt)
  return reponse
}

module.exports = {
  search,
  review,
  refactor,
}

