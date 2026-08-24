import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/MobileNav";
import { NavLink } from "@/components/NavLink";
import { PhoneLinks } from "@/components/PhoneLinks";
import { navLinks, site } from "@/lib/site";

export function Header() {
  return (
    <header className="relative sticky top-0 z-40 border-b border-border bg-page/90 backdrop-blur-md">
      <div className="border-b border-border bg-surface/90">
        <Container className="flex h-9 items-center justify-center">
          <PhoneLinks className="justify-center whitespace-nowrap" />
        </Container>
      </div>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="min-w-0 shrink"
          aria-label={`${site.name} home`}
        >
          <span className="block truncate font-medium tracking-tight text-ink">
            {site.name}
          </span>
          <span className="block truncate text-xs text-muted">
            {site.navSubtitle}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-4 md:flex lg:gap-6"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-150 hover:text-ink"
              activeClassName="text-ink"
            >
              {link.label}
            </NavLink>
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
          <Button href="/book" className="px-3 sm:hidden" aria-label="Book a call">
            Book
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
