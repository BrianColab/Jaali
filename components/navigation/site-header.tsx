"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useRef } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Container } from "@/components/ui/container";
import { siteRoutes } from "@/data/site-routes";
import { cn } from "@/utils/cn";

export function SiteHeader() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  return (
    <header className="site-header">
      <div
        className="emergency-notice"
        role="region"
        aria-label="Emergency notice"
      >
        <Container className="emergency-notice__inner">
          <svg
            className="emergency-notice__icon"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 96 96"
            fill="none"
          >
            <g
              stroke="currentColor"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M48 8L77 18V42C77 62 65 78 48 88C31 78 19 62 19 42V18L48 8Z" />
              <path d="M48 29V59" />
              <path d="M33 44H63" />
              <path d="M10 34L4 30" />
              <path d="M10 48H3" />
              <path d="M86 34L92 30" />
              <path d="M86 48H93" />
              <path d="M17 21L12 15" />
              <path d="M79 21L84 15" />
            </g>
          </svg>
          <span className="emergency-notice__divider" aria-hidden="true" />
          <p className="emergency-notice__message">
            If you are in{" "}
            <span className="emergency-notice__highlight">
              immediate danger
            </span>
            ,
          </p>
          <a
            className="emergency-notice__cta"
            href="tel:911"
            aria-label="Call 911 now"
          >
            <svg
              className="emergency-notice__phone"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M17.1 6.5c1.8-.8 3.9-.1 4.9 1.6l6.1 10.5c.9 1.6.7 3.6-.7 4.9l-4.4 4.2c3.2 6.4 8.4 11.6 14.8 14.8l4.2-4.4c1.3-1.4 3.3-1.6 4.9-.7l10.5 6.1c1.7 1 2.4 3.1 1.6 4.9l-2.7 6.1c-.8 1.8-2.5 2.9-4.5 3C28.2 58 6 35.8 6.5 12.2c.1-2 1.2-3.7 3-4.5l7.6-1.2Z"
              />
            </svg>
            Call 911
          </a>
          <span className="emergency-notice__divider" aria-hidden="true" />
          <p className="emergency-notice__aside">
            Your safety
            <br />
            matters
          </p>
        </Container>
      </div>
      <Container className="site-header__inner">
        <Link
          className="site-header__brand"
          href="/"
          onClick={() => {
            if (mobileMenuRef.current) {
              mobileMenuRef.current.open = false;
            }
          }}
        >
          <BrandLogo
            className="site-header__logo-lockup"
            priority
            sizes="(min-width: 1200px) 5.5rem, 4.5rem"
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
                    route.href === "/contact" && "site-header__donate-link",
                  )}
                  href={route.href}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <details className="site-header__menu" ref={mobileMenuRef}>
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
                      route.href === "/contact" && "site-header__donate-link",
                    )}
                    href={route.href}
                    onClick={() => {
                      if (mobileMenuRef.current) {
                        mobileMenuRef.current.open = false;
                      }
                    }}
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
