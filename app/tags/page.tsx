import { getTags } from '@/lib/cosmic'
import TagPill from '@/components/TagPill'

export const metadata = {
  title: 'Tags — My Blog',
}

export default async function TagsPage() {
  const tags = await getTags()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Tags</h1>
        <p className="mt-2 text-sm text-slate-500">Explore posts by tag</p>
      </header>

      {tags.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center text-slate-400">
          No tags found.
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <TagPill key={tag.id} tag={tag} />
          ))}
        </div>
      )}
    </div>
  )
}