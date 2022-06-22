import * as tsdoc from '@microsoft/tsdoc'
import { DeclarationReference } from '@microsoft/tsdoc/lib-commonjs/beta/DeclarationReference'

type ResolveDeclarationReference = (
  docDeclarationReference: tsdoc.DocDeclarationReference | DeclarationReference
) => { url?: string; text?: string }

export function tsdocNodeContainerToMarkdown(
  docNodeContainer: tsdoc.DocNodeContainer,
  resolveDeclarationReference?: ResolveDeclarationReference
) {
  let out = ''
  for (const node of docNodeContainer.nodes) {
    out += tsdocNodeToMarkdown(node, resolveDeclarationReference)
  }
  return out
}

export function tsdocNodeToMarkdown(
  docNode: tsdoc.DocNode,
  resolveDeclarationReference?: ResolveDeclarationReference
) {
  switch (docNode.kind) {
    case 'CodeSpan':
      return `\`${(docNode as tsdoc.DocCodeSpan).code}\``
    case 'ErrorText':
      return (docNode as tsdoc.DocErrorText).text
    case 'EscapedText':
      return (docNode as tsdoc.DocEscapedText).decodedText
    case 'FencedCode':
      const docFencedCode = docNode as tsdoc.DocFencedCode
      return `\`\`\`${docFencedCode.language ?? ''}\n${
        docFencedCode.code
      }\n\`\`\``
    case 'LinkTag':
      const docLinkTag = docNode as tsdoc.DocLinkTag

      let linkText: string = 'unknown'
      let linkUrl: string = 'about:blank'

      if (docLinkTag.codeDestination) {
        linkText =
          docLinkTag.linkText ??
          `\\<unresolved declaration reference (${docLinkTag.codeDestination.memberReferences
            .map((v) => v.memberIdentifier?.identifier)
            .join(',')})>`

        if (resolveDeclarationReference) {
          const { url, text } = resolveDeclarationReference(
            docLinkTag.codeDestination
          )
          if (url) linkUrl = url
          if (text && !docLinkTag.linkText) linkText = text
        }
      } else if (docLinkTag.urlDestination) {
        linkUrl = docLinkTag.urlDestination
        linkText = docLinkTag.linkText ?? linkUrl
      }

      return `[${linkText}](${linkUrl})`
    case 'Paragraph':
      return `\n\n${tsdocNodeContainerToMarkdown(
        docNode as tsdoc.DocParagraph,
        resolveDeclarationReference
      )}\n\n`
    case 'PlainText':
      return (docNode as tsdoc.DocPlainText).text
    case 'SoftBreak':
      return ' '
  }

  return `\\<${docNode.kind}>`
}
