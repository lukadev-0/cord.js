import { NextSeo } from 'next-seo'
import { ReactElement } from 'react'
import Layout from '../components/layout/Layout'

export default function Home() {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      <NextSeo
        title="Cord.js"
        description="Simple, fast, and powerful Discord bot framework."
        canonical="https://cord.js.org/"
        openGraph={{
          url: 'https://cord.js.org/',
          title: 'Cord.js',
          description: 'Simple, fast, and powerful Discord bot framework.',
          site_name: 'Cord.js',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="dark px-4">
        <div className="absolute inset-0 h-screen bg-gradient-to-br from-[#05061F] to-[#07020E]"></div>
        <header className="relative mx-auto flex h-screen max-w-screen-xl flex-col justify-center pt-16 text-center md:text-left">
          <div>
            <h1 className="mx-auto mb-6 text-4xl font-bold dark:text-white sm:text-5xl md:mx-0 md:text-7xl">
              Build Discord bots
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                Faster
              </span>
            </h1>

            <p className="mx-auto max-w-[30ch] text-lg text-gray-400 sm:text-xl md:mx-0 md:text-2xl">
              Cord.js is a simple, fast, and powerful Discord bot framework.
            </p>
          </div>
        </header>
      </div>

      <div className="border-t border-gray-300 px-4 dark:border-gray-700">
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
  return <Layout headerClass="dark">{page}</Layout>
}
