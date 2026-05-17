import Image from '@/app/components/SanityImage'
import DateComponent from '@/app/components/Date'

type Author = {
  firstName: string | null
  lastName: string | null
  picture?: {
    asset?: {_ref: string}
    hotspot?: {x: number; y: number}
    crop?: {top: number; bottom: number; left: number; right: number}
    alt?: string
  } | null
}

function formatNames(authors: Author[]): string {
  const names = authors
    .filter((a) => a.firstName && a.lastName)
    .map((a) => `${a.firstName} ${a.lastName}`)
  if (names.length === 0) return ''
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} & ${names[1]}`
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`
}

function AuthorAvatar({author, size}: {author: Author; size: number}) {
  return author.picture?.asset?._ref ? (
    <Image
      id={author.picture.asset._ref}
      alt={`${author.firstName} ${author.lastName}`}
      className="h-full w-full object-cover rounded-full"
      height={size}
      width={size}
      hotspot={author.picture.hotspot ?? undefined}
      crop={author.picture.crop ?? undefined}
      mode="cover"
    />
  ) : (
    <span className="text-[10px] text-gray-600 font-medium select-none">
      {author.firstName?.[0]}
      {author.lastName?.[0]}
    </span>
  )
}

export function AuthorAvatarGroup({
  authors,
  date,
}: {
  authors: Author[]
  date?: string
}) {
  const names = formatNames(authors)

  return (
    <div className="flex items-center gap-2 font-mono">
      <div className="flex -space-x-2">
        {authors.map((author, i) => (
          <div
            key={i}
            style={{zIndex: authors.length - i}}
            className="relative w-10 h-10 rounded-full border-2 border-gray-50 overflow-hidden bg-gray-200 flex items-center justify-center"
          >
            <AuthorAvatar author={author} size={40} />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {names && <span className="text-sm">{names}</span>}
        <span className="text-gray-500 text-xs">
          <DateComponent dateString={date} />
        </span>
      </div>
    </div>
  )
}

export function AuthorCards({authors}: {authors: Author[]}) {
  return (
    <div className="flex flex-wrap gap-3">
      {authors.map((author, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-sm bg-gray-50"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
            <AuthorAvatar author={author} size={40} />
          </div>
          <span className="font-mono text-sm">
            {author.firstName} {author.lastName}
          </span>
        </div>
      ))}
    </div>
  )
}
