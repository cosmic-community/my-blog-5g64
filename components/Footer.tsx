export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <span className="text-lg">📝</span> My Blog
          </p>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} My Blog. Technical articles & learning notes.
          </p>
        </div>
      </div>
    </footer>
  )
}