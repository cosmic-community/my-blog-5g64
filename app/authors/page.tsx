import Link from 'next/link'
import { getAuthors, getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'Authors — My Blog',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Authors</h1>
        <p className="mt-2 text-sm text-slate-500">The people behind the posts</p>
      </header>

      {authors.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center text-slate-400">
          No authors found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => {
            const bio = getMetafieldValue(author.metadata?.bio)
            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 transition-shadow hover:shadow-lg"
              >
                {author.metadata?.avatar ? (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={author.title}
                    width={60}
                    height={60}
                    className="h-15 w-15 rounded-full object-cover"
                    style={{ width: 60, height: 60 }}
                  />
                ) : (
                  <div className="flex h-15 w-15 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700" style={{ width: 60, height: 60 }}>
                    {author.title.charAt(0)}
                  </div>
                )}
                <div>
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-brand-600">
                    {author.title}
                  </h2>
                  {bio && <p className="text-sm text-slate-500 line-clamp-2">{bio}</p>}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}