import {Suspense} from 'react'

import {AllPosts} from '@/app/components/Posts'
import Link from 'next/link'

export default async function Page() {
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
          <Suspense>
            {await AllPosts({
              heading: 'All Posts',
              subHeading: 'A complete list of all my blog posts.',
            })}
          </Suspense>
        </aside>
      </div>
    </div>
  )
}
