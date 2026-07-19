import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Container } from "@/components/ui/container";
import { siteRoutes } from "@/data/site-routes";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid editorial-grid">
          <div className="site-footer__identity">
            <Link
              className="site-footer__brand"
              href="/"
              aria-label={siteConfig.name}
            >
              <BrandLogo
                className="site-footer__logo-lockup"
                sizes="(min-width: 48rem) 10rem, 8.5rem"
              />
            </Link>
            <p className="site-footer__status">
              We will speak her name. We will listen when Indigenous patients
              say something is wrong.
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

          <div className="site-footer__commitment">
            <p className="site-footer__commitment-heading">
              For Jaali. For Her Daughter. For Every Mother Still Fighting to Be
              Heard.
            </p>
            <p className="site-footer__status">
              We will work so that no mother is left waiting, unheard and
              unprotected.
            </p>
          </div>
        </div>

        <div className="site-footer__legal">
          <p>
            This website is not an emergency or clinical service. If you or your
            baby may be in immediate danger, call 911 or seek emergency medical
            care now.
          </p>
        </div>
      </Container>
    </footer>
  );
}
