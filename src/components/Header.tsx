import Image from "next/image";
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
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-3 sm:gap-3.5"
          aria-label={`${site.name} home`}
        >
          <Image
            src={site.logo.src}
            alt=""
            width={site.logo.width}
            height={site.logo.height}
            priority
            className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
          />
          <span className="min-w-0 leading-snug">
            <span className="hidden truncate text-base tracking-tight text-ink sm:inline">
              {site.headerLockup}
            </span>
            <span className="block sm:hidden">
              <span className="block truncate text-sm font-medium text-ink">
                GI Realty
              </span>
              <span className="block truncate text-xs text-muted">
                {site.tagline}
              </span>
            </span>
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
