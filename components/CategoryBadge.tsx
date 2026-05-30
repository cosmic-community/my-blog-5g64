import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { getCategoryColor } from '@/lib/utils'

interface CategoryBadgeProps {
  category: Category
  asLink?: boolean
}

export default function CategoryBadge({ category, asLink = true }: CategoryBadgeProps) {
  const color = getCategoryColor(category.metadata?.color)
  const name = getMetafieldValue(category.metadata?.name) || category.title

  const content = (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {name}
    </span>
  )

  if (asLink) {
    return <Link href={`/categories/${category.slug}`}>{content}</Link>
  }
  return content
}