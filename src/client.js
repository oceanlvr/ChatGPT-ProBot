const chatgpt = require('@oceanlvr/chatgpt')

const client = new chatgpt.ChatGPTAPI({ headless: true, markdown: true })

module.exports = async function search(prompt) {
  const isSignedIn = await client.getIsSignedIn()
  if (!isSignedIn)
    await client.init()

  const searchPrompt = prompt
  const response = await client.sendMessage(searchPrompt)
  // const reponse = ''
  return response
}


