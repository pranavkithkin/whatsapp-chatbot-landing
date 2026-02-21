export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>© 2025 SynOps Labs. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="mailto:pranav@synopslabs.com" className="hover:text-primary transition-colors">
            pranav@synopslabs.com
          </a>
          <a href="tel:+971566272141" className="hover:text-primary transition-colors">
            +971 56 627 2141
          </a>
          <a href="https://synopslabs.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            synopslabs.com
          </a>
        </div>
      </div>
    </footer>
  )
}
