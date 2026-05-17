import {Suspense} from 'react'
import {PortableText} from '@portabletext/react'

import {AllPosts} from '@/app/components/Posts'
import TagFilter from '@/app/components/TagFilter'
import {settingsQuery, allTagsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {dataAttr} from '@/sanity/lib/utils'

type Props = {
  searchParams: Promise<{tag?: string}>
}

export default async function Page({searchParams}: Props) {
  const {tag: tagId} = await searchParams
  const [{data: settings}, {data: tags}] = await Promise.all([
    sanityFetch({query: settingsQuery}),
    sanityFetch({query: allTagsQuery}),
  ])

  return (
    <>
      <div className="relative">
        <div className="relative bg-[url(/images/tile-1-black.png)] bg-size-[5px]">
          <div className="bg-linear-to-t from-white w-full h-full absolute top-0"></div>
          <div className="container">
            <div className="relative min-h-[40vh] mx-auto max-w-2xl pt-10 xl:pt-20 pb-30 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center justify-center">
              <div className="flex flex-col gap-4 items-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black md:w-auto w-full">
                  Hi there, I'm Adi.
                </h1>

                <div className="text-md text-left lg:text-center leading-6 prose py-1 px-0 md:px-3  font-mono italic">
                  {settings?.description && (
                    <div
                      data-sanity={dataAttr({
                        id: settings._id,
                        type: 'settings',
                        path: 'description',
                      }).toString()}
                    >
                      <PortableText value={settings.description} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <div className="mb-8">
              <h2 className="text-3xl text-gray-900 sm:text-4xl lg:text-5xl">Recent Blogs</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600 mb-6">
                These are my latest thoughts and updates.
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
    </>
  )
}
