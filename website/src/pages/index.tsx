import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock'
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

const code = `import createClient from '@cordjs/client'
import Gateway from '@cordjs/gateway'

const client = createClient([
  [Gateway, {
      token: process.env.TOKEN,
      client: {
        intents: ['GUILDS', 'GUILD_MESSAGES'],
      },
  }],
])

client.gateway.messageCreate(context => {
  const [message] = context.data

  if (message.content === '!hello-world') {
    return message.reply('Hello world!')
  }
})

client.start()`

function HomepageHeader() {
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className={clsx("container", styles.split)}>
        <div>
          <h1 className="hero__title">Launch your bots to the moon!</h1>
          <p className="hero__subtitle">Cord.js is a simple and unopinionated Discord bot framework.</p>
          <div>
            <Link
              className="button button--secondary button--lg"
              to="/docs/getting-started">
              Get Started
            </Link>
          </div>
        </div>
        <div>
          <CodeBlock className="language-js">{code}</CodeBlock>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="Simple, unopinionated, Discord bot framework.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
