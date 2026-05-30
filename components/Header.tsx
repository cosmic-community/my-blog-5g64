import Link from 'next/link'

export default function Header() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Posts' },
    { href: '/categories', label: 'Categories' },
    { href: '/tags', label: 'Tags' },
    { href: '/authors', label: 'Authors' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <span className="text-2xl">📝</span>
            <span>My Blog</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}