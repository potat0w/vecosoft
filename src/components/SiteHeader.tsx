export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-8">
        <div className="hidden items-center gap-10 lg:flex">
          <a
            href="/"
            className="text-sm tracking-[0.2em] text-foreground uppercase transition-opacity hover:opacity-60"
          >
            Home
          </a>
          <a
            href="/"
            className="text-sm tracking-[0.2em] text-foreground uppercase transition-opacity hover:opacity-60"
          >
            Orders
          </a>
          <a
            href="#support"
            className="text-sm tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground"
          >
            Support
          </a>
        </div>

        <a
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-xl tracking-[0.3em] text-foreground uppercase lg:text-2xl"
        >
          Vecoso
        </a>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <a
            href="#account"
            aria-label="Account"
            className="p-2 text-foreground transition-opacity hover:opacity-60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
          <button
            type="button"
            aria-label="Shopping bag"
            className="relative -mr-2 p-2 text-foreground transition-opacity hover:opacity-60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
