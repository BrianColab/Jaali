import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteRoutes } from "@/data/site-routes";
import { brandAssets } from "@/lib/assets";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/utils/cn";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div
        className="emergency-notice"
        role="region"
        aria-label="Emergency notice"
      >
        <Container className="emergency-notice__inner">
          <p>If you are in immediate danger, call 911.</p>
          <Link className="emergency-notice__link" href="/get-help-now">
            Get Help Now
          </Link>
        </Container>
      </div>
      <Container className="site-header__inner">
        <Link className="site-header__brand" href="/">
          <Image
            className="site-header__logo"
            src={brandAssets.officialLogo}
            alt={siteConfig.name}
            quality={92}
            sizes="(min-width: 1200px) 11rem, 8.5rem"
          />
        </Link>

        <nav
          className="site-header__desktop-nav"
          aria-label="Primary navigation"
        >
          <ul className="site-header__nav-list">
            {siteRoutes.slice(1).map((route) => (
              <li key={route.href}>
                <Link
                  className={cn(
                    "site-header__nav-link",
                    route.href === "/donate" && "site-header__donate-link",
                  )}
                  href={route.href}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <details className="site-header__menu">
          <summary className="site-header__menu-summary">
            <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
            <span className="visually-hidden">Open navigation</span>
          </summary>
          <nav
            className="site-header__mobile-nav"
            aria-label="Mobile navigation"
          >
            <ul className="site-header__mobile-nav-list">
              {siteRoutes.map((route) => (
                <li key={route.href}>
                  <Link
                    className={cn(
                      "site-header__mobile-nav-link",
                      route.href === "/donate" && "site-header__donate-link",
                    )}
                    href={route.href}
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </Container>
    </header>
  );
}
