import ollama from 'ollama'

const response = await ollama.chat({
  model: 'gemma3:1b',
  messages: [{ role: 'user', content: 'Heloooeww' }],
})
console.log(response.message.content)