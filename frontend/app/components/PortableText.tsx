/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'
import ResolvedLink from '@/app/components/ResolvedLink'
import Image from '@/app/components/SanityImage'
import CodeBlock from '@/app/components/CodeBlock'

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({value}) => {
        if (!value?.asset?._ref) {
          return null
        }

        return (
          <figure className="my-8">
            <Image
              id={value.asset._ref}
              alt={value.alt || ''}
              width={672}
              crop={value.crop}
              mode="cover"
              className="rounded-sm"
            />
          </figure>
        )
      },
      code: ({value}) => {
        return (
          <CodeBlock
            code={value?.code || ''}
            language={value?.language}
            filename={value?.filename}
          />
        )
      },
      table: ({value}) => {
        const rows: {cells?: string[]}[] = value?.rows || []
        if (rows.length === 0) return null

        const [headerRow, ...dataRows] = rows

        return (
          <div className="scrollbar-table not-prose my-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  {headerRow.cells?.map((cell, i) => (
                    <th
                      key={i}
                      className="whitespace-nowrap bg-gray-50 px-4 py-3 text-left font-semibold text-gray-900 dark:bg-gray-900 dark:text-gray-100"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900/50"
                  >
                    {row.cells?.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="whitespace-nowrap px-4 py-3 text-gray-700 dark:text-gray-300"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      },
    },
    block: {
      h1: ({children, value}) => (
        // Add an anchor to the h1
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({children, value}) => {
        // Add an anchor to the h2
        return (
          <h2 className="group relative">
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </h2>
        )
      },
    },
    marks: {
      code: ({children}) => (
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-pink-600 dark:bg-gray-800 dark:text-pink-400">
          {children}
        </code>
      ),
      link: ({children, value: link}) => {
        return <ResolvedLink link={{...link, openInNewTab: true}}>{children}</ResolvedLink>
      },
    },
  }

  return (
    <div className={`prose-a:text-blue prose-a:underline prose dark:prose-invert min-w-0 ${className}`}>
      <PortableText components={components} value={value} />
    </div>
  )
}
