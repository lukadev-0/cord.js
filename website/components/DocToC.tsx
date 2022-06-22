import clsx from 'clsx'
import React from 'react'
import slugify from 'slugify'

export default function DocToC({
  toc,
}: {
  toc: { text: string; level: number; id?: string }[]
}) {
  return (
    <ul className="mt-1">
      {toc.map((heading) => {
        const slug = heading.id ?? slugify(heading.text).toLowerCase()

        return (
          <li
            key={slug}
            className={clsx({
              'ml-4': heading.level === 3,
            })}
          >
            <a
              href={`#${slug}`}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400"
            >
              {heading.text}
            </a>
          </li>
        )
      })}{' '}
    </ul>
  )
}
