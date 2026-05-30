// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import { getCategoryColor } from '@/lib/utils'
import PostGrid from '@/components/PostGrid'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Category Not Found' }
  return { title: `${category.title} — My Blog` }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const color = getCategoryColor(category.metadata?.color)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <span
          className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          Category
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">{name}</h1>
        {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
      </header>
      <PostGrid posts={posts} emptyMessage="No posts in this category yet." />
    </div>
  )
}