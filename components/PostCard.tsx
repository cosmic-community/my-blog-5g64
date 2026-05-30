import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const category = post.metadata?.category
  const author = post.metadata?.author
  const publishedDate = post.metadata?.published_date

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-100 bg-white transition-shadow hover:shadow-lg">
      <Link href={`/posts/${post.slug}`} className="block">
        {featuredImage && (
          <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={225}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-3">
          {category && <CategoryBadge category={category} />}
          {publishedDate && (
            <span className="text-xs text-slate-400">{formatDate(publishedDate)}</span>
          )}
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-brand-600 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        {excerpt && <p className="mb-4 text-sm text-slate-500 line-clamp-3">{excerpt}</p>}
        {author && (
          <div className="flex items-center gap-2">
            {author.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                alt={author.title}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            <span className="text-xs font-medium text-slate-600">{author.title}</span>
          </div>
        )}
      </div>
    </article>
  )
}