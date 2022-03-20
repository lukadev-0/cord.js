import Cord from '@cordjs/bot'
import Gateway from '@cordjs/gateway'

const client = Cord([
  Gateway({
    token: process.env.TOKEN,
    client: {
      intents: ['GUILDS', 'GUILD_MESSAGES'],
    },
  }),
])

client.gateway.messageCreate(context => {
  const [message] = context.data

  if (message.content === 'hello-world') {
    return message.reply('Hello world!')
  }

  if (message.content === 'error-handling') {
    throw new Error('This is an error!')
  }
})

client.gateway.messageCreate((context, next, err) => {
  const [message] = context.data

  return message.reply(`An error has occurred: ${err}`)
})

client.start()
