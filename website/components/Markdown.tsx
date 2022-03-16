import { Plugin } from 'unified'

import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import rehypeHighlight from 'rehype-highlight'

import { visit, Node } from 'unist-util-visit'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import { ReactElement } from 'react'
import Link from 'next/link'

declare module 'unist' {
  interface Node {
    name: string
    attributes: {
      [property: string]:
        | string
        | number
        | boolean
        | null
        | undefined
        | (string | number)[]
    }
    children: unknown[]
  }
}

const directives: Plugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        if (node.name === 'details') {
          const [label] = node.children

          const data = node.data || (node.data = {})

          node.children.shift()

          data.hName = 'Details'
          data.hProperties = {
            label: ((label as Node).children[0] as { value: string }).value,
          }
        } else if (
          node.name === 'info' ||
          node.name === 'note' ||
          node.name === 'warning' ||
          node.name === 'danger' ||
          node.name === 'tip'
        ) {
          const label = (node.children[0] as Node).data?.directiveLabel
            ? node.children[0]
            : null

          const data = node.data || (node.data = {})

          const labels = {
            info: 'Info',
            note: 'Note',
            warning: 'Warning',
            danger: 'Danger',
            tip: 'Tip',
          }

          if (label) node.children.shift()

          data.hName = 'Admonition'
          data.hProperties = {
            label:
              ((label as Node)?.children[0] as { value: string })?.value ??
              labels[node.name],
            type: node.name,
          }
        }
      }
    })
  }
}

declare global {
  namespace JSX {
    // this merges with the existing intrinsic elements, adding 'my-custom-tag' and its props
    interface IntrinsicElements {
      Details: { label: string }
      Admonition: { label: string; type: string }
    }
  }
}

const icons: Record<string, (props: Record<string, unknown>) => ReactElement> =
  {
    info: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),

    note: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),

    warning: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),

    danger: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
        />
      </svg>
    ),

    tip: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  }

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      children={children}
      remarkPlugins={[remarkGfm, remarkDirective, directives]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        Details: ({ label, children }) => {
          return (
            <details>
              <summary className="font-bold">{label}</summary>

              {children}
            </details>
          )
        },

        Admonition: ({ label, type, children }) => {
          const Icon = icons[type]

          return (
            <div
              className={clsx('rounded-md p-6 pb-2 shadow-md shadow-black/5', {
                'bg-gray-100 dark:bg-gray-800': type === 'info',
                'bg-yellow-100 dark:bg-yellow-800': type === 'warning',
                'bg-red-100 dark:bg-red-800': type === 'danger',
                'bg-blue-100 dark:bg-blue-800': type === 'note',
                'bg-green-100 dark:bg-green-800': type === 'tip',
              })}
            >
              <h5 className="flex items-center space-x-2 font-medium text-black dark:text-white">
                <Icon className="h-6 w-6" /> <span>{label}</span>
              </h5>

              {children}
            </div>
          )
        },

        a: ({ href, ...props }) => {
          return (
            <Link href={href as string}>
              <a {...props} />
            </Link>
          )
        },
      }}
    />
  )
}
