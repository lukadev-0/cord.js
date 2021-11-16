import React, { ReactElement } from 'react'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'

const H2 = Heading('h2')

interface Props {
  summary: string,
  remarks?: string,
  grouped: [string, {
    name: string,
    summary: string,
    fullName: string,
  }[]][]
}

export default function ApiPackage({ summary, remarks, grouped }: Props): ReactElement {
  return (
    <>
      <p>{summary}</p>
      <p>{remarks}</p>

      {grouped.map(([kind, items]) => (
        <React.Fragment key={kind}>
          <H2 id={kind.toLowerCase().replace(/ /g, '-')}>{kind}</H2>
          <table>
            <tbody>
              {items.map(item => (
                <tr key={item.name}>
                  <td><Link href={item.fullName}>{item.name}</Link></td>
                  <td>{item.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      ))}
    </>
  )
}
