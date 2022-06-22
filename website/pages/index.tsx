import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { ReactElement } from 'react'
import ReactSyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import Layout from '../components/layout/Layout'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <NextSeo
        title="Cord.js"
        description="Simple, fast, and powerful Discord bot framework."
        canonical="https://cord.js.org/"
        openGraph={{
          url: 'https://cord.js.org/',
          title: 'Build your best Discord Bot.',
          description:
            'Cord.js is a Discord Bot framework with a simple, extensible API built on top of Discord.js.',
          site_name: 'Cord.js',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="px-4 pt-16 relative">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 absolute inset-0 -bottom-56"></div>
        <header className="relative mx-auto max-w-screen-xl flex flex-col items-center py-40 text-center">
          <h1 className="text-5xl md:text-6xl font-bold">
            Build your best Discord Bot.
          </h1>

          <p className="mt-8 text-gray-400 text-xl max-w-xl">
            Cord.js is a Discord Bot framework with a simple, extensible API
            built on top of{' '}
            <a
              href="https://discord.js.org/"
              className="text-white hover:underline"
            >
              Discord.js
            </a>
            .
          </p>

          <Link href="/docs/getting-started">
            <a className="mt-8 px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg text-lg hover:bg-gray-300 transition duration-500">
              Get Started
            </a>
          </Link>

          <ReactSyntaxHighlighter
            language="javascript"
            style={atomOneDark}
            PreTag={(props) => (
              <pre
                className="text-gray-300 p-4 rounded-lg bg-[#080c13] text-left max-w-xl w-full overflow-x-auto mt-10 custom-scroll custom-scroll-no-round shadow-2xl"
                {...props}
                style={{}}
              />
            )}
          >
            {`import Cord from '@cordjs/bot'
import Gateway from '@cordjs/gateway'

const bot = Cord([
  Gateway({ token: '...' }),
])

bot.gateway.messageCreate(context => {
  const { message } = context.data
  if (message.content === 'ping') {
    message.reply('🏓 Pong!')
  }
})

bot.start()`}
          </ReactSyntaxHighlighter>
        </header>
      </div>

      <div className="px-4 dark:border-gray-700 relative">
        <div className="mx-auto max-w-screen-xl py-20 text-center">
          <h2 className="mb-2 text-2xl font-medium text-black dark:text-white">
            Work in progress
          </h2>
          <p className="text-gray-700 dark:text-gray-400">
            Cord.js is currently highly in development.
          </p>
        </div>
      </div>
    </div>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout forceTheme="dark">{page}</Layout>
}
