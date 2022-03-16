import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import DocLayout from '../../components/layout/Doc'
import Layout from '../../components/layout/Layout'
import Markdown from '../../components/Markdown'
import { getDocBySlug, getPaths } from '../../lib/docs'

interface Props {
  content: string

  metadata: {
    title: string
    description: string
  }
}

export default function Docs({ content, metadata }: Props) {
  const router = useRouter()

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

        <Markdown>{content}</Markdown>
      </main>
    </>
  )
}

Docs.getLayout = (page: ReactElement) => {
  return (
    <Layout fixedHeader>
      <DocLayout sidebar="docs">{page}</DocLayout>
    </Layout>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const paths = await getPaths()

  return {
    paths: paths.map((path) => ({
      params: {
        slug: path.slug.split('/'),
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

  return {
    props: doc,
  }
}
