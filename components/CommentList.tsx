import type { Comment } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

interface CommentListProps {
  comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return <p className="text-sm text-slate-400">No comments yet. Be the first to comment!</p>
  }

  return (
    <ul className="space-y-5">
      {comments.map((comment) => {
        const name = getMetafieldValue(comment.metadata?.author_name) || 'Anonymous'
        const text = getMetafieldValue(comment.metadata?.comment)
        const date = comment.metadata?.date
        const initial = name.charAt(0).toUpperCase()

        return (
          <li key={comment.id} className="rounded-xl border border-slate-100 bg-white p-4">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {initial}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{name}</p>
                {date && <p className="text-xs text-slate-400">{formatDate(date)}</p>}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{text}</p>
          </li>
        )
      })}
    </ul>
  )
}