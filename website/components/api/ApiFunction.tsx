import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import DocToC from '../DocToC'
import ExcerptTokens from './ExcerptTokens'

interface Parameter {
  name: string
  type: (string | [string, string])[]
  description: MDXRemoteSerializeResult
  isOptional: boolean
}

interface Props {
  name: string
  packageName: string
  summary: MDXRemoteSerializeResult
  remarks: MDXRemoteSerializeResult
  description: string
  returnType: (string | [string, string])[]
  kind: string
  parameters: Parameter[]
}

function Table({
  items,
  title,
  id,
}: {
  items: Parameter[]
  title: string
  baseURL: string
  id: string
}) {
  if (items.length === 0) return null

  return (
    <>
      <h2 id={id}>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="hidden lg:table-cell">Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((apiItem) => (
            <tr key={apiItem.name}>
              <td className="w-40">
                {apiItem.name}
                {apiItem.isOptional && (
                  <span
                    title="Optional"
                    className="underline decoration-dotted"
                  >
                    ?
                  </span>
                )}
              </td>
              <td className="w-56 not-prose hidden lg:table-cell">
                <code className="font-mono">
                  <ExcerptTokens tokens={apiItem.type} />
                </code>
              </td>
              <td>
                <MDXRemote {...apiItem.description} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default function ApiFunction({
  name,
  packageName,
  summary,
  remarks,
  description,

  parameters,
  returnType,
  kind,
}: Props) {
  const router = useRouter()

  const baseURL = `/api-reference/${packageName.split('/')[1]}/${name}`

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

      <Table
        items={parameters}
        baseURL={baseURL}
        id="parameters"
        title="Parameters"
      />

      <h2 id="return-type">Return Type</h2>
      <div className="not-prose">
        <code className="font-mono">
          <ExcerptTokens tokens={returnType} />
        </code>
      </div>
    </>
  )
}

export function getApiFunctionToC({ data }: { data: Props }) {
  const tocItems = [
    [data.parameters, 'Parameters', 'parameters'],
    [data.returnType, 'Return Type', 'return-type'],
  ] as const

  const toc = tocItems.flatMap(([arr, text, id]) => {
    if (arr.length === 0) return []

    return [
      {
        text,
        id,
        level: 2,
      },
    ]
  })

  return <DocToC toc={toc} />
}
