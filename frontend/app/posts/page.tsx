import {Suspense} from 'react'
import Link from 'next/link'

import {AllPosts} from '@/app/components/Posts'
import TagFilter from '@/app/components/TagFilter'
import {sanityFetch} from '@/sanity/lib/live'
import {allTagsQuery} from '@/sanity/lib/queries'

type Props = {
  searchParams: Promise<{tag?: string}>
}

export default async function Page({searchParams}: Props) {
  const {tag: tagId} = await searchParams
  const {data: tags} = await sanityFetch({query: allTagsQuery})

  return (
    <div className="border-t border-gray-100 bg-gray-50">
      <div className="container">
        <Link className="hover:underline flex items-center gap-1 pt-12" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left-icon lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Back to Home</span>
        </Link>

        <aside className="py-12 sm:py-20">
          <div className="mb-8">
            <h2 className="text-3xl text-gray-900 sm:text-4xl lg:text-5xl mb-2">All Posts</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 mb-6">
              A complete list of all my blog posts.
            </p>
            <Suspense>
              <TagFilter tags={tags ?? []} />
            </Suspense>
          </div>
          <Suspense>
            {await AllPosts({tagId})}
          </Suspense>
        </aside>
      </div>
    </div>
  )
}
