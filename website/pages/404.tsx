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

  return path === 'docs' || path === 'api' ? (
    <Layout fixedHeader>
      <DocLayout sidebar={path}>
        <main className="prose relative mx-auto max-w-screen-md justify-center py-16 dark:prose-invert">
          <h1>
            {path === 'api'
              ? 'Class: NotFoundError'
              : "We couldn't find this doc."}
          </h1>

          <p>
            {path === 'api'
              ? 'This error occurs whenever a page is not found.'
              : "The doc you're looking for doesn't exist."}
          </p>
        </main>
      </DocLayout>
    </Layout>
  ) : (
    <Layout>
      <main className="relative mx-auto flex h-screen max-w-screen-md flex-col justify-center pt-16 text-center dark:prose-invert">
        <div>
          <h1 className="mb-8 text-4xl font-bold">
            We couldn't find this page.
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-400 lg:text-xl">
            The page you're looking for doesn't exist.
          </p>
        </div>
      </main>
    </Layout>
  )
}
