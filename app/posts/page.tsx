import { getPosts } from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'

export const metadata = {
  title: 'All Posts — My Blog',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">All Posts</h1>
        <p className="mt-2 text-sm text-slate-500">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
      </header>
      <PostGrid posts={posts} emptyMessage="No posts published yet." />
    </div>
  )
}