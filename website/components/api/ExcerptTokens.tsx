import Link from 'next/link'
import React from 'react'

export default function ExcerptTokens({
  tokens,
}: {
  tokens: (string | [string, string])[]
}) {
  return (
    <>
      {tokens.map((token, i) => {
        if (Array.isArray(token)) {
          return (
            <Link href={token[1]} key={i}>
              <a className="text-blue-700 dark:text-blue-400">{token[0]}</a>
            </Link>
          )
        }
        return <span key={i}>{token}</span>
      })}
    </>
  )
}
