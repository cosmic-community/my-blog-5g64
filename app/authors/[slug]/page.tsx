// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) return { title: 'Author Not Found' }
  return { title: `${author.title} — My Blog` }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const bio = getMetafieldValue(author.metadata?.bio)
  const website = getMetafieldValue(author.metadata?.website)
  const twitter = getMetafieldValue(author.metadata?.twitter)
  const github = getMetafieldValue(author.metadata?.github)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        {author.metadata?.avatar ? (
          <img
            src={`${author.metadata.avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={author.title}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700">
            {author.title.charAt(0)}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{author.title}</h1>
          {bio && <p className="mt-2 max-w-xl text-sm text-slate-500">{bio}</p>}
          <div className="mt-3 flex flex-wrap justify-center gap-3 sm:justify-start">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                Website
              </a>
            )}
            {twitter && (
              <a href={`https://twitter.com/${twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                Twitter
              </a>
            )}
            {github && (
              <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <h2 className="mb-6 text-xl font-bold text-slate-900">Posts by {author.title}</h2>
      <PostGrid posts={posts} emptyMessage="No posts by this author yet." />
    </div>
  )
}