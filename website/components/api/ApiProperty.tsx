import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import DocToC from '../DocToC'
import ExcerptTokens from './ExcerptTokens'

interface Props {
  name: string
  packageName: string
  summary: MDXRemoteSerializeResult
  remarks: MDXRemoteSerializeResult
  description: string
  kind: string

  parent: string
  type: (string | [string, string])[]
}

export default function ApiProperty({
  name,
  summary,
  remarks,
  description,
  kind,

  type,
}: Props) {
  const router = useRouter()

  return (
    <>
      <NextSeo
        title={`${name} - Cord.js`}
        description={description}
        canonical={`https://cord.js.org${router.asPath}`}
        openGraph={{
          url: `https://cord.js.org${router.asPath}`,
          title: `${kind} ${name}`,
          description: description,
          site_name: 'Cord.js',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <h1>
        {kind} {name}
      </h1>
      <div className="lead">
        <MDXRemote {...summary} />
      </div>

      {remarks && <MDXRemote {...remarks} />}

      <pre>
        <code className="not-prose block p-4">
          <ExcerptTokens tokens={type} />
        </code>
      </pre>
    </>
  )
}

export function getApiPropertyToC() {
  return null
}
