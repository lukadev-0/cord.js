import Client from '@cordjs/client'
import Gateway from '@cordjs/gateway'

const client = new Client({
  plugins: [
    Gateway({
      token: process.env.TOKEN!,
      client: {
        intents: ['GUILDS', 'GUILD_MESSAGES'],
      },
    }),
  ],
})

const msgPrefixes = ['Hey there,', "What's up,", 'Ay,', 'Hello,']

client.gateway.ready(() => {
  console.log('[gateway] READY')
})

client.gateway.messageCreate(ctx => {
  const [msg] = ctx.data

  if (
    msg.content
      .toLowerCase()
      .replace(/[^\w\s\.]/g, '')
      .includes('hey cord.js')
  ) {
    msg.reply(
      `${msgPrefixes[Math.floor(Math.random() * msgPrefixes.length)]} ${
        msg.author
      }!`
    )
  }
})

client.start().then(() => {
  console.log('[info] started')
})
