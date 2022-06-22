import {
  ApiClass,
  ApiDocumentedItem,
  ApiEnum,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiItemKind,
  ApiMethod,
  ApiProperty,
  ApiTypeAlias,
  ApiVariable,
} from '@microsoft/api-extractor-model'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { ReactElement, ReactNode } from 'react'
import DocLayout, {
  SidebarCategory,
  SidebarItem,
} from '../../components/layout/Doc'
import Layout from '../../components/layout/Layout'
import {
  getApiModel,
  recursiveGetMembers,
  getMemberPath,
  getMemberByPath,
  getSummaryText,
  getRemarksText,
  excerptArrayToSerializedArray,
  tsdocNodeToMarkdown,
  tsdocNodeContainerToMarkdown,
  createResolveDeclarationReference,
} from '../../lib/api'
import Link from 'next/link'
import clsx from 'clsx'
import { Router, useRouter } from 'next/router'

import ApiPackagePage, {
  getApiPackageToC,
} from '../../components/api/ApiPackage'
import ApiClassPage, { getApiClassToC } from '../../components/api/ApiClass'
import ApiPropertyPage, {
  getApiPropertyToC,
} from '../../components/api/ApiProperty'
import ApiFunctionPage, {
  getApiFunctionToC,
} from '../../components/api/ApiFunction'

interface Props {
  data: any
  packageName: string
  kind: ApiItemKind
  breadcrumbs: string[]
}

function ApiItemPageBody({ data, kind, packageName }: Props) {
  switch (kind) {
    // Can't use the ApiItemKind enum because api-extractor-model imports fs
    case 'Package':
      return <ApiPackagePage {...data} />
    case 'Interface':
    case 'Class':
      return (
        <ApiClassPage
          {...data}
          kind={kind === 'Interface' ? 'interface' : 'class'}
          packageName={packageName}
        />
      )
    case 'TypeAlias':
    case 'Variable':
    case 'PropertySignature':
    case 'Property':
      return (
        <ApiPropertyPage
          {...data}
          kind={
            kind === 'Variable'
              ? 'variable'
              : kind === 'TypeAlias'
              ? 'type'
              : 'property'
          }
          packageName={packageName}
        />
      )
    case 'Function':
    case 'MethodSignature':
    case 'Method':
      return (
        <ApiFunctionPage
          {...data}
          kind={kind === 'Function' ? 'function' : 'method'}
          packageName={packageName}
        />
      )
  }

  return <div>Unknown Kind: {kind}</div>
}

function Breadcrumb({ children, href }: { children: ReactNode; href: string }) {
  const router = useRouter()

  return (
    <li>
      <Link href={href}>
        <a
          className={clsx(
            'block px-3 py-1 bg-gray-300 dark:bg-gray-800  rounded-full',
            {
              '!bg-opacity-30 hover:!bg-opacity-100': router.asPath !== href,
            }
          )}
        >
          {children}
        </a>
      </Link>
    </li>
  )
}

function BreadcrumbArrow() {
  return (
    <span className="mx-1 text-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )
}

export default function ApiItemPage(props: Props) {
  let breadcrumbPath = `/api-reference/${props.packageName.split('/')[1]}`

  const breadcrumbs = [
    <Breadcrumb href="/api-reference" key={0}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </Breadcrumb>,

    <BreadcrumbArrow key={1} />,

    <Breadcrumb
      href={`/api-reference/${props.packageName.split('/')[1]}`}
      key={2}
    >
      {props.packageName}
    </Breadcrumb>,
  ]

  for (const breadcrumb of props.breadcrumbs) {
    breadcrumbPath += `/${breadcrumb}`
    const href = breadcrumbPath

    breadcrumbs.push(
      <BreadcrumbArrow key={breadcrumbs.length} />,
      <Breadcrumb href={href} key={breadcrumbs.length + 1}>
        {breadcrumb}
      </Breadcrumb>
    )
  }

  return (
    <>
      <nav
        className="fixed top-16 left-0 right-0 transform
        translate-y-px z-10 border-b border-gray-200 bg-white/20 
        overflow-y-auto custom-scroll custom-scroll-no-round backdrop-blur
        dark:border-gray-700 dark:bg-gray-900/20
        lg:border-none lg:sticky lg:top-0 lg:backdrop-blur-none lg:!bg-transparent"
      >
        <div className="mx-4 lg:m-0 min-w-min md:ml-56">
          <ul className="mx-auto max-w-screen-md flex items-center h-10 lg:h-16">
            {breadcrumbs}
          </ul>
        </div>
      </nav>

      <main className="prose relative mx-auto block max-w-screen-md flex-grow pt-16 lg:pt-0 pb-16 prose-a:decoration-blue-500 prose-img:rounded dark:prose-invert">
        <ApiItemPageBody {...props} />
      </main>
    </>
  )
}

ApiItemPage.getLayout = (page: ReactElement, props: Props, router: Router) => {
  return (
    <Layout fixedHeader>
      <DocLayout
        sidebar={
          <SidebarCategory name="Classes">
            <SidebarItem name="Context" href="/api-reference/bot/Context" />
          </SidebarCategory>
        }
        toc={getPageToC(props)}
      >
        {page}
      </DocLayout>
    </Layout>
  )
}

async function withSummaryProp(item: ApiDocumentedItem) {
  const summaryText = getSummaryText(item)
  return { summary: await serialize(summaryText) }
}

async function withRemarksProp(item: ApiDocumentedItem) {
  const remarksText = getRemarksText(item)
  return { remarks: remarksText ? await serialize(remarksText) : null }
}

async function withDescription(item: ApiDocumentedItem) {
  const summaryText = getSummaryText(item)
  return {
    summary: await serialize(summaryText),
    description: summaryText.trim(),
    ...(await withRemarksProp(item)),
  }
}

function getPageToC(pageProps: Props) {
  switch (pageProps.kind) {
    // Can't use the ApiItemKind enum because api-extractor-model imports fs
    case 'Package':
      return getApiPackageToC(pageProps)
    case 'Class':
      return getApiClassToC(pageProps)
    case 'PropertySignature':
    case 'TypeAlias':
    case 'Variable':
    case 'Property':
      return getApiPropertyToC()
    case 'Function':
    case 'MethodSignature':
    case 'Method':
      return getApiFunctionToC(pageProps)
  }
}

async function getPageProps(item: ApiItem) {
  const apiPackage = item.getAssociatedPackage()!

  switch (item.kind) {
    case ApiItemKind.Package: {
      const apiMembers = apiPackage.entryPoints[0].members

      const classes = []
      const enums = []
      const functions = []
      const interfaces = []
      const variables = []
      const typeAliases = []

      for (const apiMember of apiMembers) {
        switch (apiMember.kind) {
          case ApiItemKind.Class:
            const apiClass = apiMember as ApiClass
            classes.push({
              ...(await withSummaryProp(apiClass)),
              name: apiClass.name,
            })
            break
          case ApiItemKind.Enum:
            const apiEnum = apiMember as ApiEnum
            enums.push({
              ...(await withSummaryProp(apiEnum)),
              name: apiEnum.name,
            })
            break
          case ApiItemKind.Function:
            const apiFunction = apiMember as ApiFunction
            functions.push({
              ...(await withSummaryProp(apiFunction)),
              name: apiFunction.name,
            })
            break
          case ApiItemKind.Interface:
            const apiInterface = apiMember as ApiInterface
            interfaces.push({
              ...(await withSummaryProp(apiInterface)),
              name: apiInterface.name,
            })
            break
          case ApiItemKind.Variable:
            const apiVariable = apiMember as ApiVariable
            variables.push({
              ...(await withSummaryProp(apiVariable)),
              name: apiVariable.name,
            })
            break
          case ApiItemKind.TypeAlias:
            const apiTypeAlias = apiMember as ApiTypeAlias
            typeAliases.push({
              ...(await withSummaryProp(apiTypeAlias)),
              name: apiTypeAlias.name,
            })
            break
        }
      }

      return {
        ...(await withDescription(apiPackage)),
        name: apiPackage.name,

        classes,
        enums,
        functions,
        interfaces,
        variables,
        typeAliases,
      }
    }

    case ApiItemKind.Interface:
    case ApiItemKind.Class: {
      const apiClass = item as ApiClass

      const properties = []
      const methods = []

      for (const apiMember of apiClass.members) {
        switch (apiMember.kind) {
          case ApiItemKind.PropertySignature:
          case ApiItemKind.Property:
            const apiProperty = apiMember as ApiProperty
            properties.push({
              ...(await withSummaryProp(apiProperty)),
              name: apiProperty.name,
              type: excerptArrayToSerializedArray(
                apiProperty.propertyTypeExcerpt.spannedTokens,
                apiProperty
              ),
            })
            break

          case ApiItemKind.MethodSignature:
          case ApiItemKind.Method:
            const apiMethod = apiMember as ApiMethod
            methods.push({
              ...(await withSummaryProp(apiMethod)),
              name: apiMethod.name,
            })
            break
        }
      }

      return {
        ...(await withDescription(apiClass)),
        name: apiClass.name,

        properties,
        methods,
      }
    }

    case ApiItemKind.PropertySignature:
    case ApiItemKind.Property: {
      const apiProperty = item as ApiProperty

      return {
        ...(await withDescription(apiProperty)),
        name: apiProperty.name,
        type: excerptArrayToSerializedArray(
          apiProperty.propertyTypeExcerpt.spannedTokens,
          apiProperty
        ),
      }
    }

    case ApiItemKind.Function:
    case ApiItemKind.MethodSignature:
    case ApiItemKind.Method: {
      const apiMethod = item as ApiMethod

      return {
        ...(await withDescription(apiMethod)),
        name: apiMethod.name,
        returnType: excerptArrayToSerializedArray(
          apiMethod.returnTypeExcerpt.spannedTokens,
          apiMethod
        ),

        parameters: await Promise.all(
          apiMethod.parameters.map(async (parameter) => ({
            name: parameter.name,
            isOptional: parameter.isOptional,
            type: excerptArrayToSerializedArray(
              parameter.parameterTypeExcerpt.spannedTokens,
              apiMethod
            ),
            description: await serialize(
              parameter.tsdocParamBlock
                ? tsdocNodeContainerToMarkdown(
                    parameter.tsdocParamBlock.content,
                    createResolveDeclarationReference(apiMethod)
                  )
                : 'No Description'
            ),
          }))
        ),
      }
    }

    case ApiItemKind.Variable: {
      const apiVariable = item as ApiVariable

      return {
        ...(await withDescription(apiVariable)),
        name: apiVariable.name,
        type: excerptArrayToSerializedArray(
          apiVariable.variableTypeExcerpt.spannedTokens,
          apiVariable
        ),
      }
    }

    case ApiItemKind.TypeAlias: {
      const apiVariable = item as ApiTypeAlias

      return {
        ...(await withDescription(apiVariable)),
        name: apiVariable.name,
        type: excerptArrayToSerializedArray(
          apiVariable.typeExcerpt.spannedTokens,
          apiVariable
        ),
      }
    }
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const apiModel = await getApiModel()

  return {
    paths: apiModel.packages.flatMap((apiPackage) => {
      const entryPoint = apiPackage.entryPoints[0]

      return [
        {
          params: {
            slug: [apiPackage.name.split('/')[1]],
          },
        },
        ...recursiveGetMembers(entryPoint).map((apiItem) => {
          return {
            params: {
              slug: [apiPackage.name.split('/')[1], ...getMemberPath(apiItem)],
            },
          }
        }),
      ]
    }),
    fallback: false,
  }
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{ slug: string[] }>
): Promise<GetStaticPropsResult<unknown>> {
  const [packageName, ...memberPath] = ctx.params!.slug

  const apiModel = await getApiModel()
  const apiPackage = apiModel.tryGetPackageByName(packageName)
  if (!apiPackage)
    throw new Error('Failed to find package by name ' + packageName)
  const apiEntryPoint = apiPackage.entryPoints[0]
  const apiMember =
    memberPath.length > 0
      ? getMemberByPath(apiEntryPoint, memberPath)
      : apiPackage
  if (!apiMember) throw new Error('Failed to find member by path ' + memberPath)

  const data = await getPageProps(apiMember)

  return {
    props: {
      kind: apiMember.kind,
      packageName: apiPackage.name,
      data,
      breadcrumbs: memberPath,
    },
  }
}
