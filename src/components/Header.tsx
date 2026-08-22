import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/MobileNav";
import { PhoneLinks } from "@/components/PhoneLinks";
import { navLinks, site } from "@/lib/site";

export function Header() {
  return (
    <header className="relative sticky top-0 z-40 border-b border-border bg-page/90 backdrop-blur-md">
      <div className="border-b border-border bg-surface/90">
        <Container className="flex min-h-9 items-center justify-center py-1.5">
          <PhoneLinks />
        </Container>
      </div>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="min-w-0 shrink">
          <span className="block truncate font-medium tracking-tight text-ink">
            {site.name}
          </span>
          <span className="block truncate text-xs text-muted">
            {site.navSubtitle}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-150 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/book"
            className="hidden sm:inline-flex"
            aria-label="Book a 30-min call"
          >
            Book a 30-min call
          </Button>
          <Button href="/book" className="sm:hidden px-3" aria-label="Book a call">
            Book
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
