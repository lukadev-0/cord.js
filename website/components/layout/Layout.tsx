import clsx from 'clsx'
import React, { ReactElement } from 'react'
import useIsomorphicLayoutEffect from '../../lib/useIsomorphicLayoutEffect'
import { useTheme } from '../ThemeContext'
import Header from './Header'

interface Props {
  children: ReactElement
  fixedHeader?: boolean
  headerClass?: string
  forceTheme?: string
}

export default function Layout({
  children,
  fixedHeader,
  headerClass,
  forceTheme,
}: Props) {
  const [theme] = typeof forceTheme === 'string' ? [forceTheme] : useTheme()

  useIsomorphicLayoutEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <>
      <Header fixed={fixedHeader} className={headerClass} />

      {children}

      <footer className="relative bg-gray-900 py-16 px-4 dark:bg-[#080c13]">
        <div className="mx-auto max-w-screen-xl">
          <p className="mb-2 text-gray-400">Consider supporting me</p>

          <a href="https://buymeacoffee.com/lukadev">
            <img
              src="https://raw.githubusercontent.com/lukadev-0/lukadev-0/main/buy-coffee.png"
              className="inline-block"
            />
          </a>
        </div>
      </footer>
    </>
  )
}
