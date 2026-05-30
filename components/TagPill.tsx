import Link from 'next/link'
import type { Tag } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface TagPillProps {
  tag: Tag
}

export default function TagPill({ tag }: TagPillProps) {
  const name = getMetafieldValue(tag.metadata?.name) || tag.title
  return (
    <Link
      href={`/tags/${tag.slug}`}
      className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 transition-colors hover:bg-brand-100 hover:text-brand-700"
    >
      #{name}
    </Link>
  )
}