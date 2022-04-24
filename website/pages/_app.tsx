import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { ThemeContext } from '../components/ThemeContext'
import Head from 'next/head'
import useMedia from '../lib/useMedia'
import useIsomorphicLayoutEffect from '../lib/useIsomorphicLayoutEffect'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
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

  const dark = typeof window === 'undefined' ? true : useMedia("(prefers-color-scheme: dark)")

  useIsomorphicLayoutEffect(() => {
    window.localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <Head>
        <link rel="icon" href={dark ? "/favicon-dark.svg" : "/favicon.svg"} />
      </Head>

      <div>{getLayout(<Component {...pageProps} />)}</div>
    </ThemeContext.Provider>
  )
}
