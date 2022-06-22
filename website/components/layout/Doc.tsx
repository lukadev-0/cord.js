import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export function SidebarCategory({
  children,
  name,
}: {
  children: ReactNode
  name: string
}) {
  return (
    <li>
      <h5 className="mb-2 font-bold">{name}</h5>

      <ul className="space-y-px border-l border-gray-200 dark:border-gray-800">
        {children}
      </ul>
    </li>
  )
}

export function SidebarItem({
  href,
  name,
  root,
}: {
  href: string
  name: string
  root?: boolean
}) {
  const router = useRouter()

  return (
    <li>
      <Link href={href}>
        <a
          className={clsx('block text-gray-700 dark:text-gray-400', {
            '-ml-px border-l border-transparent pl-4 ': !root,
            'hover:border-gray-400 dark:hover:border-gray-600':
              router.asPath !== href,
            'border-blue-700 dark:border-blue-400': router.asPath === href,
          })}
        >
          {name}
        </a>
      </Link>
    </li>
  )
}

interface Props {
  children: ReactNode
  sidebar: React.ReactNode
  toc: React.ReactNode
  noPadding?: boolean
}

export default function DocLayout({
  children,
  sidebar,
  noPadding,
  toc,
}: Props) {
  return (
    <div className="relative min-h-screen dark:bg-gray-900">
      <div
        className={clsx(
          'px-4 fixed inset-0 mx-auto max-w-screen-2xl hidden md:flex justify-between pointer-events-none',
          {
            'pt-16': !noPadding,
          }
        )}
      >
        <aside
          className={clsx(
            'custom-scroll overflow-auto mb-4 pointer-events-auto',
            {
              'mt-16': !noPadding,
              'mt-32': noPadding,
            }
          )}
        >
          <nav className="w-56">
            <ul className="space-y-4">{sidebar}</ul>
          </nav>
        </aside>

        {toc && (
          <nav
            className={clsx(
              'custom-scroll overflow-auto hidden lg:block w-56 pb-4 pointer-events-auto',
              {
                'mt-16': !noPadding,
                'pt-32': noPadding,
              }
            )}
          >
            <h5 className="font-semibold text-gray-900 dark:text-gray-100">
              On this page
            </h5>

            {toc}
          </nav>
        )}
      </div>

      <div
        className={clsx(
          'mx-auto max-w-screen-2xl px-4 md:pl-56 lg:pr-64 lg:pl-64',
          {
            'pt-16': !noPadding,
          }
        )}
      >
        {children}
      </div>
    </div>
  )
}
