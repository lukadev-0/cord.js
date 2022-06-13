import Script from 'next/script'
import React, { ReactElement } from 'react'
import Header from './Header'

interface Props {
  children: ReactElement
  fixedHeader?: boolean
  headerClass?: string
}

export default function Layout({ children, fixedHeader, headerClass }: Props) {
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
