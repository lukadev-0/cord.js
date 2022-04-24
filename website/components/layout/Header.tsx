import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useTheme } from '../ThemeContext'
import useIsomorphicLayoutEffect from '../../lib/useIsomorphicLayoutEffect'

interface Props {
  fixed?: boolean
  className?: string
}

export default function Header({ className, fixed }: Props) {
  const [theme, setTheme] = useTheme()
  const [client, setClient] = useState(false)

  useIsomorphicLayoutEffect(() => {
    setClient(true)
  }, [])

  return (
    <header
      className={clsx(
        'left-0 right-0 top-0 z-10 px-4',
        {
          absolute: !fixed,
          'fixed border-b border-gray-200 bg-white/20 px-4 backdrop-blur dark:border-gray-700 dark:bg-gray-900/20':
            fixed,
        },
        className
      )}
    >
      <div
        className={clsx('mx-auto flex items-center justify-between', {
          'h-20 max-w-screen-xl': !fixed,
          'h-16 max-w-screen-2xl': fixed,
        })}
      >
        <Link href="/">
          <a className="flex items-center">
            <svg
              className="mr-4 h-10 w-10 translate-y-[1px]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M15.532 73.8192C15.0053 72.257 14.431 71.6486 14.431 69.0279H85.6724C85.6724 72.023 85.0982 72.257 84.5715 73.8192C83.7353 76.3678 82.5291 78.7673 80.9531 81.0177C79.4092 83.241 77.5437 85.2744 75.3566 87.1181C73.1695 88.9618 70.7411 90.5479 68.0715 91.8765C65.4341 93.1779 62.5876 94.1946 59.532 94.9267C56.4765 95.6316 53.3083 95.9841 50.0276 95.9841C46.7469 95.9841 43.5788 95.6316 40.5232 94.9267C37.4998 94.1946 34.6533 93.1779 31.9837 91.8765C29.3463 90.5479 26.934 88.9618 24.7469 87.1181C22.5597 85.2744 20.6782 83.241 19.1021 81.0177C17.5583 78.7673 16.3682 76.3678 15.532 73.8192Z"
                className="-translate-y-[2px] fill-blue-900 dark:fill-blue-200"
              />
              <path
                fillRule="evenodd"
                d="M0 16.7011C0 9.69526 5.78291 4.01587 12.7888 4.01587H87.3148C94.3207 4.01587 100 9.69526 100 16.7011V56.3426C100 63.3485 94.3207 69.0279 87.3148 69.0279H12.7888C5.78292 69.0279 0.103516 63.3485 0.103516 56.3426V16.7011ZM36.5737 37.3147C36.5737 43.4449 31.6042 48.4143 25.4741 48.4143C19.3439 48.4143 14.3745 43.4449 14.3745 37.3147C14.3745 31.1846 19.3439 26.2151 25.4741 26.2151C31.6042 26.2151 36.5737 31.1846 36.5737 37.3147ZM74.6295 48.4143C80.7597 48.4143 85.7291 43.4449 85.7291 37.3147C85.7291 31.1846 80.7597 26.2151 74.6295 26.2151C68.4994 26.2151 63.5299 31.1846 63.5299 37.3147C63.5299 43.4449 68.4994 48.4143 74.6295 48.4143Z"
                className="fill-blue-800 dark:fill-blue-100"
              />
            </svg>

            <div className="text:black text-lg font-semibold dark:text-white">
              Cord.js
            </div>
          </a>
        </Link>

        <div className="flex items-center divide-x divide-gray-200 dark:divide-gray-700">
          <nav className="pr-4">
            <ul className="flex items-center space-x-4 font-semibold">
              <li>
                <Link href="/docs/getting-started">
                  <a className="text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400">
                    Docs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/api">
                  <a className="text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400">
                    API
                  </a>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="pl-4 text-gray-700 dark:text-gray-400">
            <ul className="flex items-center space-x-4">
              <li className="hover:text-blue-700 dark:hover:text-blue-400">
                <button
                  className="block cursor-pointer"
                  aria-label="Switch Theme"
                  onClick={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                  }}
                >
                  {!client ? (
                    <div className="h-6 w-6" />
                  ) : theme === 'light' ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                        stroke="currentColor"
                      ></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  )}
                </button>
              </li>
              <li className="hover:text-blue-700 dark:hover:text-blue-400">
                <a
                  aria-label="github"
                  href="https://github.com/lukadev-0/cord.js"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
