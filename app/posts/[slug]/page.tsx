// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getPostBySlug,
  getApprovedComments,
  getMetafieldValue,
} from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'
import TagPill from '@/components/TagPill'
import CommentList from '@/components/CommentList'
import CommentForm from '@/components/CommentForm'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} — My Blog`,
    description: getMetafieldValue(post.metadata?.excerpt),
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const comments = await getApprovedComments(post.id)

  const featuredImage = post.metadata?.featured_image
  const content = getMetafieldValue(post.metadata?.content)
  const category = post.metadata?.category
  const author = post.metadata?.author
  const tags = post.metadata?.tags || []
  const publishedDate = post.metadata?.published_date

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/posts" className="mb-6 inline-block text-sm font-medium text-brand-600 hover:text-brand-700">
        ← Back to posts
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        {category && <CategoryBadge category={category} />}
        {publishedDate && <span className="text-sm text-slate-400">{formatDate(publishedDate)}</span>}
      </div>

      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
        {post.title}
      </h1>

      {author && (
        <div className="mb-8 flex items-center gap-3">
          {author.metadata?.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={author.title}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div>
            <Link
              href={`/authors/${author.slug}`}
              className="text-sm font-semibold text-slate-800 hover:text-brand-600"
            >
              {author.title}
            </Link>
            {getMetafieldValue(author.metadata?.bio) && (
              <p className="text-xs text-slate-400 line-clamp-2">
                {getMetafieldValue(author.metadata?.bio)}
              </p>
            )}
          </div>
        </div>
      )}

      {featuredImage && (
        <div className="mb-8 overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={`${featuredImage.imgix_url}?w=1400&h=700&fit=crop&auto=format,compress`}
            alt={post.title}
            width={700}
            height={350}
            className="w-full object-cover"
          />
        </div>
      )}

      {content && (
        <div
          className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
          {tags.map((tag) => (
            <TagPill key={tag.id} tag={tag} />
          ))}
        </div>
      )}

      {/* Comments */}
      <section className="mt-14 border-t border-slate-100 pt-10">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Comments {comments.length > 0 && <span className="text-slate-400">({comments.length})</span>}
        </h2>
        <div className="mb-8">
          <CommentList comments={comments} />
        </div>
        <CommentForm postId={post.id} />
      </section>
    </article>
  )
}