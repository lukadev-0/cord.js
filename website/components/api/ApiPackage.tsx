import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import DocToC from '../DocToC'

interface ApiItem {
  name: string
  summary: MDXRemoteSerializeResult
}

interface Props {
  name: string
  summary: MDXRemoteSerializeResult
  remarks: MDXRemoteSerializeResult
  description: string

  classes: ApiItem[]
  enums: ApiItem[]
  functions: ApiItem[]
  interfaces: ApiItem[]
  variables: ApiItem[]
  typeAliases: ApiItem[]
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

export default function ApiPackage({
  name,
  summary,
  remarks,
  description,

  classes,
  enums,
  functions,
  interfaces,
  variables,
  typeAliases,
}: Props) {
  const router = useRouter()

  const baseURL = `/api-reference/${name.split('/')[1]}`

  return (
    <>
      <NextSeo
        title={`${name} - Cord.js`}
        description={description}
        canonical={`https://cord.js.org${router.asPath}`}
        openGraph={{
          url: `https://cord.js.org${router.asPath}`,
          title: name,
          description: description,
          site_name: 'Cord.js',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <h1>{name}</h1>
      <div className="lead">
        <MDXRemote {...summary} />
      </div>

      {remarks && <MDXRemote {...remarks} />}

      <Table items={classes} baseURL={baseURL} id="classes" title="Classes" />
      <Table items={enums} baseURL={baseURL} id="enums" title="Enums" />
      <Table
        items={functions}
        baseURL={baseURL}
        id="functions"
        title="Functions"
      />
      <Table
        items={interfaces}
        baseURL={baseURL}
        id="interfaces"
        title="Interfaces"
      />
      <Table
        items={variables}
        baseURL={baseURL}
        id="variables"
        title="Variables"
      />
      <Table
        items={typeAliases}
        baseURL={baseURL}
        id="type-aliases"
        title="Type Aliases"
      />
    </>
  )
}

export function getApiPackageToC({ data }: { data: Props }) {
  const tocItems = [
    [data.classes, 'Classes', 'classes'],
    [data.enums, 'Enums', 'enums'],
    [data.functions, 'Functions', 'functions'],
    [data.interfaces, 'Interfaces', 'interfaces'],
    [data.variables, 'Variables', 'variables'],
    [data.typeAliases, 'Type Aliases', 'type-aliases'],
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
