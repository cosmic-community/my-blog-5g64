import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { postId, name, email, comment } = body

    if (!postId || !name?.trim() || !email?.trim() || !comment?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await cosmic.objects.insertOne({
      type: 'comments',
      title: `Comment by ${name}`,
      metadata: {
        author_name: name,
        email: email,
        comment: comment,
        approved: false,
        date: new Date().toISOString().split('T')[0],
        post: postId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}