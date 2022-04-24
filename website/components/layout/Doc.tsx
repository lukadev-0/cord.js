import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

function SidebarCategory({
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

function SidebarItem({
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
            'hover:border-gray-400 dark:hover:border-gray-600': router.asPath !== href, 
            'border-blue-700 dark:border-blue-400': router.asPath === href,
          })}
        >
          {name}
        </a>
      </Link>
    </li>
  )
}

function DocsSidebar() {
  return (
    <>
      <SidebarCategory name="Guides">
        <SidebarItem href="/docs/getting-started" name="Getting Started" />
      </SidebarCategory>
      <SidebarCategory name="Concepts">
        <SidebarItem href="/docs/middleware" name="Middleware" />
        <SidebarItem href="/docs/plugins" name="Plugins" />
      </SidebarCategory>
      <SidebarCategory name="Plugins">
        <SidebarItem href="/docs/plugin-gateway" name="Gateway" />
        <SidebarItem href="/docs/plugin-interactions" name="Interactions" />
      </SidebarCategory>
    </>
  )
}

interface Props {
  children: ReactNode
  sidebar: 'docs' | 'api'
  noPadding?: boolean
}

export default function DocLayout({ children, sidebar, noPadding }: Props) {
  return (
    <div className="relative min-h-screen dark:bg-gray-900">
      <div
        className={clsx('fixed inset-0 mx-auto flex max-w-screen-2xl px-4', {
          'pt-16': !noPadding,
        })}
      >
        <aside
          className={clsx('custom-scroll overflow-auto', {
            'pt-16': !noPadding,
            'pt-32': noPadding,
          })}
        >
          <nav className="w-56">
            <ul className="space-y-4">
              {sidebar === 'docs' ? <DocsSidebar /> : null}
            </ul>
          </nav>
        </aside>
      </div>

      <div
        className={clsx('mx-auto max-w-screen-2xl px-4', {
          'pt-16': !noPadding,
        })}
      >
        {children}
      </div>
    </div>
  )
}
