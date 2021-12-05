import { createClient } from '@cordjs/client'
import { Gateway } from '@cordjs/gateway'

const client = createClient([
  [
    Gateway,
    {
      token: process.env.TOKEN!,
      client: {
        intents: ['GUILDS', 'GUILD_MESSAGES'],
      },
    },
  ],
])

client.gateway.messageCreate(context => {
  const [message] = context.data

  if (message.content === 'cord.js hello-world') {
    return message.reply('Hello world!')
  }

  if (message.content === 'cord.js throw') {
    throw new Error('This is an error!')
  }
})

client.gateway.messageCreate((context, next, err) => {
  const [message] = context.data

  return message.reply(`An error has occurred: ${err}`)
})

client.start()