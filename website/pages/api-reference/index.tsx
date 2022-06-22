import { GetStaticPropsResult } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { ReactElement } from 'react'
import DocLayout, {
  SidebarCategory,
  SidebarItem,
} from '../../components/layout/Doc'
import Layout from '../../components/layout/Layout'
import { getApiModel, tsdocNodeContainerToMarkdown } from '../../lib/api'

interface Props {
  packages: {
    name: string
    summary?: MDXRemoteSerializeResult
  }[]
}

export default function ApiModelPage({ packages }: Props) {
  return (
    <>
      <NextSeo
        title={`API Reference - Cord.js`}
        description="Cord.js API Reference"
        canonical={`https://cord.js.org/api`}
        openGraph={{
          url: `https://cord.js.org/api`,
          title: 'API Reference',
          description: 'Cord.js API Reference',
          site_name: 'Cord.js',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <main className="prose relative mx-auto block max-w-screen-md flex-grow py-16 prose-a:decoration-blue-500 prose-img:rounded dark:prose-invert">
        <h1>API Reference</h1>

        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((apiPackage) => (
              <tr key={apiPackage.name}>
                <td className="w-40">
                  <Link
                    href={`/api-reference/${apiPackage.name.split('/')[1]}`}
                  >
                    <a>{apiPackage.name}</a>
                  </Link>
                </td>
                <td>
                  {apiPackage.summary ? (
                    <MDXRemote {...apiPackage.summary} />
                  ) : (
                    <p>No Summary</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}

ApiModelPage.getLayout = (page: ReactElement, { packages }: Props) => {
  return (
    <Layout fixedHeader>
      <DocLayout
        sidebar={
          <>
            <SidebarCategory name="Packages">
              {packages.map((apiPackage) => (
                <SidebarItem
                  key={apiPackage.name}
                  name={apiPackage.name}
                  href={`/api-reference/${apiPackage.name.split('/')[1]}`}
                />
              ))}
            </SidebarCategory>
          </>
        }
        toc={null}
      >
        {page}
      </DocLayout>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const apiModel = await getApiModel()

  const packages = apiModel.packages.map(async (apiPackage) => ({
    name: apiPackage.name,
    summary: apiPackage.tsdocComment?.summarySection
      ? await serialize(
          tsdocNodeContainerToMarkdown(apiPackage.tsdocComment.summarySection)
        )
      : undefined,
  }))

  return {
    props: {
      packages: await Promise.all(packages),
    },
  }
}
