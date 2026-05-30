# My Blog

![App Preview](https://imgix.cosmicjs.com/db09f670-5c23-11f1-ba46-4feeec079fc7-autopilot-photo-1577563908411-5077b6dc7624-1780144449358.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A clean, modern personal blog built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Publish technical articles and learning notes with full support for categories, tags, and a comment system. The design is minimal, fresh, and fully responsive.

## Features

- 📝 **Blog Posts** — Beautifully rendered articles with featured images, excerpts, and rich content
- 🏷️ **Categories** — Browse posts grouped by colorful category badges
- #️⃣ **Tags** — Discover related content through a flexible tagging system
- 👤 **Authors** — Author profiles with bios, avatars, and social links
- 💬 **Comments** — Visitors can leave comments on posts (with moderation support)
- 🎨 **Clean Design** — Minimal, modern UI built with Tailwind CSS and the Inter font
- 📱 **Fully Responsive** — Looks great on every device
- ⚡ **Fast & SEO-friendly** — Server Components with optimized images

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a1ad8ea2f83f89252e6e585&clone_repository=6a1ad9fb2f83f89252e6e5cd)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: 创建一个个人博客，用来发布技术文章和学习笔记，支持文章分类、标签和评论功能，风格简洁清爽"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, tags, posts, comments. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: 创建一个个人博客，用来发布技术文章和学习笔记，支持文章分类、标签和评论功能，风格简洁清爽

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) ([SDK docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js 18+)
- A Cosmic account and bucket with the content types: authors, categories, tags, posts, comments

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set environment variables (these are provided automatically when cloning in Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the dev server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all published posts with author, category and tags
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)

// Create a comment
await cosmic.objects.insertOne({
  type: 'comments',
  title: 'Comment by Jane',
  metadata: {
    author_name: 'Jane',
    email: 'jane@example.com',
    comment: 'Great post!',
    approved: false,
    date: new Date().toISOString().split('T')[0],
    post: postId,
  },
})
```

## Cosmic CMS Integration

This app reads content directly from your Cosmic bucket. The object types used are:

- **posts** — title, excerpt, content, featured_image, published_date, author, category, tags
- **authors** — name, bio, avatar, website, twitter, github
- **categories** — name, description, color
- **tags** — name
- **comments** — author_name, email, comment, approved, date, post

All data fetching happens in Server Components for security and performance. Comment submission uses a Next.js API route with the Cosmic write key. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the environment variables `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Connect your repository
2. Set build command to `bun run build` and publish directory to `.next`
3. Add the environment variables
4. Deploy

<!-- README_END -->