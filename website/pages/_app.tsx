import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useState } from 'react'
import { NextPage } from 'next'
import { ThemeContext } from '../components/ThemeContext'
import Head from 'next/head'
import useMedia from '../lib/useMedia'
import useIsomorphicLayoutEffect from '../lib/useIsomorphicLayoutEffect'
import Link from 'next/link'
import slugify from 'slugify'

import { MDXProvider } from '@mdx-js/react'
import Note from '../components/docs/Note'
import Warning from '../components/docs/Warning'
import Info from '../components/docs/Info'
import Disclosure from '../components/docs/Disclosure'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, pageProps: unknown) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  const [theme, setTheme] = useState(
    typeof window === 'undefined'
      ? 'light'
      : document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
  )

  const dark =
    typeof window === 'undefined'
      ? true
      : useMedia('(prefers-color-scheme: dark)')

  useIsomorphicLayoutEffect(() => {
    window.localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <MDXProvider
        components={{
          Note,
          Warning,
          Disclosure,
          Info,

          a: ({ href, ...props }) => (
            <Link href={href!}>
              <a {...props} />
            </Link>
          ),
          h2: ({ children, ...props }) => (
            <h2 {...props} id={slugify(String(children)).toLowerCase()}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 {...props} id={slugify(String(children)).toLowerCase()}>
              {children}
            </h3>
          ),
        }}
      >
        <Head>
          <link rel="icon" href={dark ? '/favicon-dark.svg' : '/favicon.svg'} />
        </Head>

        <div>{getLayout(<Component {...pageProps} />, pageProps)}</div>
      </MDXProvider>
    </ThemeContext.Provider>
  )
}
