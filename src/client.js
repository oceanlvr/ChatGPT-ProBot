const { ChatGPTAPI } = require('@oceanlvr/chatgpt')

module.exports = async function search(searchPrompt) {
  const client = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN })
  await client.ensureAuth()
  const reponse = await client.sendMessage(searchPrompt)
  return reponse
}
