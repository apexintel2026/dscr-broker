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
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
          aria-label={`${site.name} home`}
        >
          <Image
            src={site.logo.src}
            alt=""
            width={site.logo.width}
            height={site.logo.height}
            priority
            className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
          />
          <span className="min-w-0 truncate text-xs tracking-tight text-muted sm:text-sm">
            {site.tagline}
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
