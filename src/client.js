const { ChatGPTAPI } = require('@oceanlvr/chatgpt')
// import { ChatGPTAPI } from 'chatgpt'

let client = null
module.exports = async function search(searchPrompt) {
  if (!client)
    client = new ChatGPTAPI({ sessionToken: process.env.SESSION_TOKEN })
  await client.ensureAuth()
  return await client.sendMessage(searchPrompt)
}


