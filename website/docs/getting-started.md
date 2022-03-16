---
title: Getting Started
description: Learn how to write a Discord bot using Cord.js.
slug: getting-started
---

:::note[In Development]

Cord.js is currently highly in development.
A lot of stuff is missing and the documentation is incomplete.

Any bugs that you may find, please report them in the [issue tracker](https://github.com/lukadev-0/cord.js/issues).

:::

## Creating the bot

We first need to create the bot itself on the [Discord Developer Portal](https://discord.com/developers/applications).

::::details[Creating a bot]

Press the "New Application" button

![](/getting-started/Applications.png)
\
Enter in an application name and press "Create"
![](/getting-started/CreateApplication.png)
\
Go to the "Bot" tab and press "Add Bot"
![](/getting-started/AddBot.png)
\
And then copy the token as we are going to need it.
![](/getting-started/CopyToken.png)

:::warning

The token is a secret, so it should be kept secret.

Anyone with the token can access your bot, and call any Discord API.

:::

::::

## Setting up the project

First, we need to initialize our project.

```sh
$ mkdir my-cool-bot && cd my-cool-bot  # create a new folder and cd into it
$ npm init -y                          # create a package.json

# for yarn users:
$ yarn init -y
```

Now, we'll need to install the required packages.

```sh
$ npm install @cordjs/bot @cordjs/gateway

# for yarn users:
$ yarn add @cordjs/bot @cordjs/gateway
```

The `@cordjs/bot` package will manage our bot, middleware and plugins.

The `@cordjs/gateway` package is what's known as a [plugin](/docs/plugins), it will
handle connecting to the [Discord gateway](https://discord.com/developers/docs/topics/gateway) and
allow us to listen to events such as `messageCreate`.

## Coding the bot

Let's get started coding!

### Instantiating the bot instance

Create a file called `index.js` with the following code:

```js
import Cord from '@cordjs/bot'
import Gateway from '@cordjs/gateway'

// Using CommonJS
// const Cord = require("@cordjs/bot")
// const Gateway = require"("@cordjs/gateway")

const bot = Cord([
  Gateway({
    token: '<YOUR_TOKEN_HERE>',
    client: {
      intents: ['GUILDS', 'GUILD_MESSAGES'],
    },
  }),
])
```

This code will create a Cord.js Bot with the `Gateway` plugin.

:::note

The token should be kept secret.

It is recommended to store your token in a `.env` file and add it to your `.gitignore`.
And use the [`dotenv`](https://npmjs.com/package/dotenv) package to load your .env file.

:::

### Adding middleware

Now we need to use [middleware](/docs/middleware) so we can detect
whenever a message has been sent.

Put the following code after the previous code:

```js
bot.gateway.messageCreate((context) => {
  const [message] = context.data

  if (message.content === 'hello cord.js') {
    message.reply('Hello World! :wave:')
  }
})
```

The `context` parameter has information about the event.

The `context.data` property has the data of the event,
such as the message.
It's an array containing the parameters from [Discord.js](https://discord.js), so we can
use destructuring to get the message.

Check the [Discord.js documentation](https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-apiRequest)
for a list of events and the parameters that are passed to them.

## Running the bot

Lets run the bot!

```sh
$ node .   # runs the index.js file
```

Add the bot to a server and say `hello cord.js`.

If everything went well, it should respond with `Hello World! 👋`.
