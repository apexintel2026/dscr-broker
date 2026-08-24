import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhoneLinks } from "@/components/PhoneLinks";
import { niches } from "@/lib/niches";
import { navLinks, resourceLinks, site } from "@/lib/site";

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-medium text-ink">{site.name}</p>
          <p className="text-sm text-muted">{site.navSubtitle}</p>
          <p className="text-sm text-muted">{site.tagline}</p>
          <PhoneLinks size="md" />
          <p className="text-xs text-muted">
            Broker, not a lender. We do not make credit decisions or fund
            loans.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Desk
          </p>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink transition-colors duration-150 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
                className="text-ink transition-colors duration-150 hover:text-accent"
              >
                Book a 30-min call
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Resources
          </p>
          <ul className="space-y-2 text-sm">
            {niches.map((niche) => (
              <li key={niche.href}>
                <Link
                  href={niche.href}
                  className="text-ink transition-colors duration-150 hover:text-accent"
                >
                  {niche.footerLabel}
                </Link>
              </li>
            ))}
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink transition-colors duration-150 hover:text-accent"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Compliance
          </p>
          <p className="text-muted">NMLS ID: TBD</p>
          <p className="text-muted">Equal Housing Opportunity</p>
          <p className="text-muted">
            This site is not a commitment to lend. All loans are subject to
            investor guidelines and underwriting by the capital source.
          </p>
          <p className="text-muted">
            Business-purpose / non-owner-occupied only. Not for primary
            residences.
          </p>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
