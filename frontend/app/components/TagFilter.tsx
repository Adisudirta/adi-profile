'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {AllTagsQueryResult} from '@/sanity.types'

export default function TagFilter({tags}: {tags: AllTagsQueryResult}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTag = searchParams.get('tag')

  const setTag = (tagId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tagId) {
      params.set('tag', tagId)
    } else {
      params.delete('tag')
    }
    router.push(`/posts?${params.toString()}`, {scroll: false})
  }

  if (!tags.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setTag(null)}
        className={`text-sm px-3 py-1 rounded-full border transition-colors cursor-pointer ${
          !activeTag
            ? 'bg-gray-900 text-white border-gray-900'
            : 'border-gray-300 text-gray-600 hover:border-gray-500'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag._id}
          onClick={() => setTag(tag._id)}
          className={`text-sm px-3 py-1 rounded-full border transition-colors cursor-pointer ${
            activeTag === tag._id
              ? 'bg-gray-900 text-white border-gray-900'
              : 'border-gray-300 text-gray-600 hover:border-gray-500'
          }`}
        >
          {tag.title}
        </button>
      ))}
    </div>
  )
}
