import {MetadataRoute} from 'next'
import {client} from '@/sanity/lib/client'
import {sitemapData} from '@/sanity/lib/queries'

export const revalidate = 3600 // revalidate every hour

const BASE_URL = 'https://www.adisudirta.site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await client.fetch(sitemapData, {}, {next: {revalidate: 3600}})

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: 'monthly',
    },
  ]

  if (allPostsAndPages?.length) {
    for (const p of allPostsAndPages) {
      const isPost = p._type === 'post'
      sitemap.push({
        url: isPost ? `${BASE_URL}/posts/${p.slug}` : `${BASE_URL}/${p.slug}`,
        lastModified: p._updatedAt || new Date(),
        priority: isPost ? 0.5 : 0.8,
        changeFrequency: isPost ? 'never' : 'monthly',
      })
    }
  }

  return sitemap
}
