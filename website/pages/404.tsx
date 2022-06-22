import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DocLayout from '../components/layout/Doc'
import Layout from '../components/layout/Layout'

export default function Custom404() {
  const router = useRouter()
  const [client, setClient] = useState(false)
  const path = router.asPath.split('/')[1]

  useEffect(() => {
    setClient(true)
  }, [])

  // the path is only available on the client
  // as this page is statically generated
  if (!client)
    return (
      <noscript>
        <h1>404</h1>
        <p>The page you're looking for is not found</p>
        <hr />
        <p>Please enable JavaScript</p>
      </noscript>
    )

  return path === 'docs' || path === 'api-reference' ? (
    <Layout fixedHeader>
      <DocLayout
        toc={<div className="text-gray-600 dark:text-gray-400 mt-1">404</div>}
        sidebar={
          <Link
            href={path === 'docs' ? '/docs/getting-started' : '/api-reference'}
          >
            <a className="flex items-center group relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 fixed transform group-hover:-translate-x-1 transition-transform duration-150"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="ml-6 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                Return to {path === 'docs' ? 'docs' : 'API'}
              </span>
            </a>
          </Link>
        }
      >
        <main className="prose relative mx-auto max-w-screen-md justify-center py-16 dark:prose-invert">
          <h1>Page not found</h1>

          <p>This page doesn't exist.</p>
        </main>
      </DocLayout>
    </Layout>
  ) : (
    <Layout>
      <main className="relative mx-auto flex h-screen max-w-screen-md flex-col justify-center pt-16 text-center dark:prose-invert">
        <div>
          <h1 className="mb-8 text-4xl font-bold">Page not found</h1>

          <p className="text-lg text-gray-700 dark:text-gray-400 lg:text-xl">
            This page doesn't exist.
          </p>
        </div>
      </main>
    </Layout>
  )
}
