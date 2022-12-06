const { ChatGPTAPI } = require('@oceanlvr/chatgpt')

const client = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN })
module.exports = async function search(searchPrompt) {
  // await client.ensureAuth()
  const reponse = await client.sendMessage(searchPrompt)
  return reponse
}
