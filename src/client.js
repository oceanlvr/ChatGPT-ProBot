const { ChatGPTAPI } = require('@oceanlvr/chatgpt')
// import { ChatGPTAPI } from 'chatgpt'

const client = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN })

module.exports = async function search(searchPrompt) {
  await client.ensureAuth()
  return await client.sendMessage(searchPrompt)
}


