import glob from 'glob'
import { promisify } from 'util'
import { join } from 'path'
import frontMatter from 'front-matter'
import { readFile } from 'fs/promises'

const base = join(process.cwd(), 'docs')
const globAsync = promisify(glob)

function getHeadings(doc: string) {
  const headingLines = doc.split('\n').filter((line) => {
    return line.match(/^###*\s/)
  })

  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, '')
    const level = raw.slice(0, 3) === '###' ? 3 : 2

    return { text, level }
  })
}

export async function getDocs() {
  const paths = await globAsync('**/*.mdx', { cwd: base })

  return Promise.all(
    paths.map(async (v) => {
      const path = join(base, v)
      const doc = await readFile(path, 'utf8')

      const { attributes } = frontMatter<{
        title: string
        slug?: string
        description: string
      }>(doc)

      return {
        path,
        slug: attributes.slug ?? v,
        content: doc,
      }
    })
  )
}

export async function getDocBySlug(slug: string) {
  const docs = await getDocs()
  const doc = docs.find((v) => v.slug === slug)
  if (!doc) throw new Error('unknown slug')

  return {
    content: doc.content,
    headings: getHeadings(doc.content),
  }
}
