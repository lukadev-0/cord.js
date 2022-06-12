import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import DocLayout, {
  SidebarCategory,
  SidebarItem,
} from '../../components/layout/Doc'
import Layout from '../../components/layout/Layout'
import { getDocBySlug, getDocs } from '../../lib/docs'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import slugify from 'slugify'
import clsx from 'clsx'

interface Props {
  mdxSource: MDXRemoteSerializeResult
  headings: { text: string; level: number }[]
}

export default function Docs({ mdxSource }: Props) {
  const router = useRouter()

  const metadata = mdxSource.frontmatter as {
    title: string
    description: string
  }

  return (
    <>
      <NextSeo
        title={`${metadata.title} - Cord.js`}
        description={metadata.description}
        canonical={`https://cord.js.org${router.asPath}`}
        openGraph={{
          url: `https://cord.js.org${router.asPath}`,
          title: metadata.title,
          description: metadata.description,
          site_name: 'Cord.js',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <main className="prose relative mx-auto block max-w-screen-md flex-grow py-16 prose-a:decoration-blue-500 prose-img:rounded dark:prose-invert">
        <h1>{metadata.title}</h1>
        <p className="mb-14 text-xl text-gray-800 dark:text-gray-400">
          {metadata.description}
        </p>

        <MDXRemote {...mdxSource} />
      </main>
    </>
  )
}

Docs.getLayout = (page: ReactElement, { headings }: Props) => {
  return (
    <Layout fixedHeader>
      <DocLayout
        sidebar={
          <>
            <SidebarCategory name="Guides">
              <SidebarItem
                href="/docs/getting-started"
                name="Getting Started"
              />
            </SidebarCategory>
            <SidebarCategory name="Concepts">
              <SidebarItem href="/docs/middleware" name="Middleware" />
              <SidebarItem href="/docs/plugins" name="Plugins" />
            </SidebarCategory>
            <SidebarCategory name="Plugins">
              <SidebarItem href="/docs/plugin-gateway" name="Gateway" />
              <SidebarItem
                href="/docs/plugin-interactions"
                name="Interactions"
              />
            </SidebarCategory>
          </>
        }
        toc={
          <ul className="mt-1">
            {headings.map((heading) => {
              const slug = slugify(heading.text).toLowerCase()

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
            })}
          </ul>
        }
      >
        {page}
      </DocLayout>
    </Layout>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const docs = await getDocs()

  return {
    paths: docs.map((doc) => ({
      params: {
        slug: doc.slug.split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{ slug: string[] }>
): Promise<GetStaticPropsResult<Props>> {
  const slug = ctx.params!.slug.join('/')
  const doc = await getDocBySlug(slug)
  const mdxSource = await serialize(doc.content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
  })

  return {
    props: { mdxSource, headings: doc.headings },
  }
}
