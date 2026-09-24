export function SiteFooter() {
  return (
    <footer id="support" className="mt-auto bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-xl tracking-[0.3em] uppercase">
              Vecoso
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/60">
              Timeless pieces, carefully tracked from warehouse to your door.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-background/50 uppercase">
              Shop
            </p>
            <ul className="space-y-3 text-sm text-background/80">
              <li>
                <a href="/" className="transition-opacity hover:opacity-60">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/" className="transition-opacity hover:opacity-60">
                  Collection
                </a>
              </li>
              <li>
                <a href="/" className="transition-opacity hover:opacity-60">
                  Essentials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-background/50 uppercase">
              Support
            </p>
            <ul className="space-y-3 text-sm text-background/80">
              <li>
                <a href="/" className="transition-opacity hover:opacity-60">
                  Orders
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@example.com"
                  className="transition-opacity hover:opacity-60"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/" className="transition-opacity hover:opacity-60">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          <div id="account">
            <p className="mb-4 text-xs tracking-[0.3em] text-background/50 uppercase">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-background/80">
              <li>support@example.com</li>
              <li>Mon–Fri, 9am–6pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-background/15 pt-8 text-xs text-background/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Vecoso. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/" className="transition-colors hover:text-background/80">
              Privacy Policy
            </a>
            <a href="/" className="transition-colors hover:text-background/80">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
