import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import DocToC from '../DocToC'
import ExcerptTokens from './ExcerptTokens'

interface ApiItem {
  name: string
  type?: (string | [string, string])[]
  summary: MDXRemoteSerializeResult
}

interface Props {
  name: string
  packageName: string
  summary: MDXRemoteSerializeResult
  remarks: MDXRemoteSerializeResult
  description: string
  kind: string

  properties: ApiItem[]
  methods: ApiItem[]
}

function Table({
  items,
  title,
  baseURL,
  id,
}: {
  items: ApiItem[]
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
            {items[0].type && <th className="hidden lg:table-cell">Type</th>}
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((apiItem) => (
            <tr key={apiItem.name}>
              <td className="w-40">
                <Link href={`${baseURL}/${apiItem.name}`}>
                  <a>{apiItem.name}</a>
                </Link>
              </td>
              {apiItem.type && (
                <td className="w-56 not-prose hidden lg:table-cell">
                  <code className="font-mono">
                    <ExcerptTokens tokens={apiItem.type} />
                  </code>
                </td>
              )}
              <td>
                <MDXRemote {...apiItem.summary} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default function ApiClass({
  name,
  packageName,
  summary,
  remarks,
  description,
  kind,

  properties,
  methods,
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
        items={properties}
        baseURL={baseURL}
        id="properties"
        title="Properties"
      />
      <Table items={methods} baseURL={baseURL} id="methods" title="Methods" />
    </>
  )
}

export function getApiClassToC({ data }: { data: Props }) {
  const tocItems = [
    [data.properties, 'Properties', 'properties'],
    [data.methods, 'Methods', 'methods'],
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
