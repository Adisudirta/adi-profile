import Link from 'next/link'

import {sanityFetch} from '@/sanity/lib/live'
import {morePostsQuery, allPostsQuery, postsByTagQuery} from '@/sanity/lib/queries'
import {AllPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import OnBoarding from '@/app/components/Onboarding'
import Image from '@/app/components/SanityImage'
import {dataAttr} from '@/sanity/lib/utils'
import {AuthorAvatarGroup} from '@/app/components/Authors'

const Post = ({post}: {post: AllPostsQueryResult[number]}) => {
  const {_id, title, slug, excerpt, date, authors, tags} = post

  return (
    <article
      data-sanity={dataAttr({id: _id, type: 'post', path: 'title'}).toString()}
      key={_id}
      className="border group border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative"
    >
      <Link className="hover:text-brand underline transition-colors" href={`/posts/${slug}`}>
        <span className="absolute inset-0 z-10" />
      </Link>
      <div className="flex md:flex-row flex-col-reverse gap-2 justify-between items-start">
        <div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag._id}
                  className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-700"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-2xl mb-4">{title}</h3>

          <p className="line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]">{excerpt}</p>
        </div>

        {post?.coverImage && (
          <Image
            id={post.coverImage.asset?._ref || ''}
            alt={post.coverImage.alt || ''}
            className="rounded-sm w-full md:w-50 grayscale-100 group-hover:grayscale-0 transition-all object-cover"
            width={200}
            height={538}
            crop={post.coverImage.crop}
          />
        )}
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        {authors && authors.length > 0 ? (
          <AuthorAvatarGroup authors={authors} date={date} />
        ) : (
          <time className="text-gray-500 text-xs font-mono" dateTime={date}>
            <DateComponent dateString={date} />
          </time>
        )}
      </div>
    </article>
  )
}

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && <h2 className="text-3xl text-gray-900 sm:text-4xl lg:text-5xl">{heading}</h2>}
    {subHeading && <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>}
    <div className="pt-6 space-y-6">{children}</div>
  </div>
)

export const MorePosts = async ({skip, limit}: {skip: string; limit: number}) => {
  const {data} = await sanityFetch({
    query: morePostsQuery,
    params: {skip, limit},
  })

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Posts heading={`Recent Posts (${data?.length})`}>
      {data?.map((post: AllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}

export const AllPosts = async ({
  heading,
  subHeading,
  tagId,
}: {
  heading?: string
  subHeading?: string
  tagId?: string
}) => {
  const {data} = tagId
    ? await sanityFetch({query: postsByTagQuery, params: {tagId}})
    : await sanityFetch({query: allPostsQuery})

  if (!data || data.length === 0) {
    return tagId ? (
      <p className="text-gray-500 text-sm">No posts found for this tag.</p>
    ) : (
      <OnBoarding />
    )
  }

  return (
    <Posts heading={heading} subHeading={subHeading}>
      {data.map((post: AllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}
