// app/tags/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getTagBySlug, getPostsByTag, getMetafieldValue } from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tag = await getTagBySlug(slug)
  if (!tag) return { title: 'Tag Not Found' }
  return { title: `#${tag.title} — My Blog` }
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const posts = await getPostsByTag(tag.id)
  const name = getMetafieldValue(tag.metadata?.name) || tag.title

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">#{name}</h1>
        <p className="mt-2 text-sm text-slate-500">
          {posts.length} post{posts.length !== 1 ? 's' : ''} tagged
        </p>
      </header>
      <PostGrid posts={posts} emptyMessage="No posts with this tag yet." />
    </div>
  )
}