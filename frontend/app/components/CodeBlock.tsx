import {codeToHtml} from 'shiki'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export default async function CodeBlock({code, language, filename}: CodeBlockProps) {
  let html: string
  try {
    html = await codeToHtml(code || '', {
      lang: language || 'text',
      theme: 'github-dark',
    })
  } catch {
    // Fallback for unsupported languages
    html = await codeToHtml(code || '', {
      lang: 'text',
      theme: 'github-dark',
    })
  }

  return (
    <div className="not-prose my-6 rounded-lg border border-gray-800 bg-gray-950">
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
          {filename && <span className="font-mono text-xs text-gray-400">{filename}</span>}
          {language && (
            <span className="ml-auto font-mono text-xs uppercase text-gray-500">{language}</span>
          )}
        </div>
      )}
      <div
        className="scrollbar-code overflow-x-auto text-sm [&>pre]:m-0! [&>pre]:min-w-full! [&>pre]:bg-transparent! [&>pre]:p-4"
        dangerouslySetInnerHTML={{__html: html}}
      />
    </div>
  )
}
