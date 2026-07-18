import Link from "next/link";

import { Newsletter } from "@/components/content/newsletter";
import { Container } from "@/components/ui/container";
import { siteRoutes } from "@/data/site-routes";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  // TODO(assets): Keep the approved media-free footer until missingSectionAssets.footer is resolved.
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid editorial-grid">
          <div className="site-footer__identity">
            <p className="site-footer__brand">{siteConfig.name}</p>
            <p className="site-footer__status">
              Approved footer statement pending.
            </p>
          </div>

          <nav
            className="site-footer__navigation"
            aria-label="Footer navigation"
          >
            <ul className="site-footer__nav-list">
              {siteRoutes.map((route) => (
                <li key={route.href}>
                  <Link className="site-footer__nav-link" href={route.href}>
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__newsletter">
            <Newsletter
              heading="Newsletter"
              description="Approved newsletter description and provider integration pending."
            />
          </div>
        </div>

        <div className="site-footer__legal">
          <p>Approved legal, privacy, and emergency notices pending review.</p>
        </div>
      </Container>
    </footer>
  );
}
