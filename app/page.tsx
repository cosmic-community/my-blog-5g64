import Link from 'next/link'
import { getPosts, getCategories, getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'
import PostGrid from '@/components/PostGrid'
import CategoryBadge from '@/components/CategoryBadge'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Technical Articles & Learning Notes
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-500">
          A clean, minimal space to share what I learn and build. Browse by category, tag, or author.
        </p>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="mb-14">
          <Link
            href={`/posts/${featured.slug}`}
            className="group block overflow-hidden rounded-2xl border border-slate-100 bg-white transition-shadow hover:shadow-xl md:grid md:grid-cols-2"
          >
            {featured.metadata?.featured_image && (
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 md:aspect-auto">
                <img
                  src={`${featured.metadata.featured_image.imgix_url}?w=1000&h=700&fit=crop&auto=format,compress`}
                  alt={featured.title}
                  width={500}
                  height={350}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-3">
                {featured.metadata?.category && (
                  <CategoryBadge category={featured.metadata.category} asLink={false} />
                )}
                {featured.metadata?.published_date && (
                  <span className="text-xs text-slate-400">
                    {formatDate(featured.metadata.published_date)}
                  </span>
                )}
              </div>
              <h2 className="mb-3 text-2xl font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-brand-600">
                {featured.title}
              </h2>
              {getMetafieldValue(featured.metadata?.excerpt) && (
                <p className="text-sm text-slate-500 line-clamp-3">
                  {getMetafieldValue(featured.metadata?.excerpt)}
                </p>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Latest posts */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Latest Posts</h2>
          <Link href="/posts" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>
        <PostGrid posts={rest.length > 0 ? rest : posts} emptyMessage="No posts published yet." />
      </section>
    </div>
  )
}