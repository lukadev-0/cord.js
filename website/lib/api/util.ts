import {
  ApiDocumentedItem,
  ApiItem,
  ApiModel,
  ApiNameMixin,
  ApiPackage,
  ExcerptToken,
} from '@microsoft/api-extractor-model'
import { DocDeclarationReference } from '@microsoft/tsdoc'
import { DeclarationReference } from '@microsoft/tsdoc/lib-commonjs/beta/DeclarationReference'
import { tsdocNodeContainerToMarkdown } from './tsdocToMarkdown'

export function createResolveDeclarationReference(contextApiItem: ApiItem) {
  const hierarchy = contextApiItem.getHierarchy()
  const apiModel = hierarchy[0] as ApiModel
  const apiPackage = hierarchy[1] as ApiPackage

  return (
    declarationReference: DocDeclarationReference | DeclarationReference
  ) => {
    const result = apiModel.resolveDeclarationReference(
      declarationReference,
      contextApiItem
    )

    if (result.resolvedApiItem) {
      return {
        url: `/api-reference/${apiPackage.name.split('/')[1]}/${getMemberPath(
          result.resolvedApiItem
        ).join('/')}`,
        text: result.resolvedApiItem.displayName,
      }
    }

    return {
      url: undefined,
      text: undefined,
    }
  }
}

export function recursiveGetMembers(apiItem: ApiItem, members: ApiItem[] = []) {
  for (const member of apiItem.members) {
    members.push(member)
    recursiveGetMembers(member, members)
  }
  return members
}

export function getMemberPath(apiItem: ApiItem) {
  const path: string[] = []
  for (const item of apiItem.getHierarchy().slice(2)) {
    if ('name' in item) {
      const namedItem = item as ApiNameMixin
      if (namedItem.name !== '') {
        path.push(namedItem.name)
      }
    }
  }
  return path
}

export function getMemberByPath(
  apiItem: ApiItem,
  path: string[]
): ApiItem | null {
  const [name, ...rest] = path
  const member = apiItem.members.find((member) => member.displayName === name)
  if (member) {
    if (rest.length === 0) {
      return member
    } else {
      return getMemberByPath(member, rest)
    }
  }
  return null
}

export function getSummaryText(apiItem: ApiDocumentedItem) {
  if (apiItem.tsdocComment?.summarySection) {
    return tsdocNodeContainerToMarkdown(
      apiItem.tsdocComment.summarySection,
      createResolveDeclarationReference(apiItem)
    )
  }
  return 'No Summary'
}

export function getRemarksText(apiItem: ApiDocumentedItem) {
  if (apiItem.tsdocComment?.remarksBlock) {
    return tsdocNodeContainerToMarkdown(
      apiItem.tsdocComment.remarksBlock.content,
      createResolveDeclarationReference(apiItem)
    )
  }
  return undefined
}

export function excerptArrayToSerializedArray(
  excerptArray: ReadonlyArray<ExcerptToken>,
  contextApiItem: ApiItem
) {
  const resolveDeclarationReference =
    createResolveDeclarationReference(contextApiItem)

  return excerptArray.map((token) => {
    if (token.canonicalReference) {
      const resolved = resolveDeclarationReference(token.canonicalReference)
      if (resolved.url) {
        return [token.text, resolved.url]
      }
    }

    return token.text
  })
}
