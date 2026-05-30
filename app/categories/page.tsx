import Link from 'next/link'
import { getCategories, getMetafieldValue } from '@/lib/cosmic'
import { getCategoryColor } from '@/lib/utils'

export const metadata = {
  title: 'Categories — My Blog',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Categories</h1>
        <p className="mt-2 text-sm text-slate-500">Browse posts by topic</p>
      </header>

      {categories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center text-slate-400">
          No categories found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const color = getCategoryColor(category.metadata?.color)
            const name = getMetafieldValue(category.metadata?.name) || category.title
            const description = getMetafieldValue(category.metadata?.description)
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group rounded-xl border border-slate-100 bg-white p-5 transition-shadow hover:shadow-lg"
              >
                <span
                  className="mb-3 inline-block h-2 w-12 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <h2 className="mb-1 text-lg font-bold text-slate-900 group-hover:text-brand-600">
                  {name}
                </h2>
                {description && <p className="text-sm text-slate-500 line-clamp-2">{description}</p>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}