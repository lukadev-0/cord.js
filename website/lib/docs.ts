import glob from 'glob'
import { promisify } from 'util'
import { join, relative } from 'path'
import frontMatter from 'front-matter'
import { readFile } from 'fs/promises'

const base = join(process.cwd(), 'docs')
const globAsync = promisify(glob)

export interface Doc {
  slug: string
  content: string
  metadata: {
    title: string
    slug?: string | undefined
    description: string
  }
}

export async function getPaths() {
  const paths = await globAsync('**/*.md', { cwd: base })

  return Promise.all(
    paths.map(async (v) => {
      const doc = await getDoc(join(base, v))

      return {
        path: join(base, v),
        slug: doc.slug,
      }
    })
  )
}

export async function getDocBySlug(slug: string) {
  const docs = await getPaths()
  const doc = docs.find((v) => v.slug === slug)
  if (!doc) throw new Error('unknown slug')

  return getDoc(doc.path)
}

export async function getDoc(path: string) {
  const fileContent = await readFile(path, 'utf8')
  const content = frontMatter<{
    [index: string]: unknown
    title: string
    slug?: string
    description: string
  }>(fileContent)

  const slug = content.attributes.slug ?? relative(base, path)

  const doc = {
    slug,

    content: content.body,

    metadata: {
      ...content.attributes,
    },
  }

  return doc
}
