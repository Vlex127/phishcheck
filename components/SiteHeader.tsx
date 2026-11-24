"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/quiz", label: "Quiz" },
  { href: "/checker", label: "Link Checker" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-sm"
        >
          <span className="relative flex size-8 items-center justify-center rounded-[4px] bg-ink text-canvas sm:size-9">
            <span className="font-display text-xl font-extrabold leading-none">
              P
            </span>
            <span className="absolute -right-1 -top-1 size-2 rounded-full bg-accent ring-2 ring-canvas" />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-[1.25rem] font-bold leading-none tracking-[-0.05em] sm:text-[1.4rem]">
              PhishCheck
            </span>
            <span className="mt-1 hidden font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-muted sm:block">
              CSC 333 / LASU
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex h-16 items-stretch text-[11px] font-semibold sm:gap-1 sm:text-[13px]"
        >
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center border-b-2 px-2 transition-colors sm:px-3 ${
                  isActive
                    ? "border-accent text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
