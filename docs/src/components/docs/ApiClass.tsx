import React, { ReactElement } from 'react'
import CodeBlock from '@theme/CodeBlock'

interface Props {
  summary: string,
  remarks?: string,
  excerpt: string,
}

export default function ApiClass({ summary, remarks, excerpt }: Props): ReactElement {
  return (
    <>
      <p>
        {summary}
      </p>
      <p>
        {remarks}
      </p>
      <CodeBlock className="language-ts">{excerpt}</CodeBlock>
    </>
  )
}
