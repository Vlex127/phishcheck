"use client";

import Link from "next/link";
import { ArrowPathIcon, ArrowRightIcon } from "@/components/icons";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="flex-1">
      <div className="mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="border border-line bg-surface">
          <div aria-hidden="true" className="h-1.5 bg-danger" />
          <div className="p-5 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-danger">
              System / error
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.05em] sm:text-5xl">
              That page did not load.
            </h1>
            <p className="mt-3 max-w-lg text-base leading-7 text-muted">
              Try the page again. If the problem continues, go back home and
              reload the app.
            </p>

            {error.digest && (
              <p className="mt-3 break-all font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                Reference / {error.digest}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink bg-ink px-5 text-sm font-semibold text-canvas transition-colors hover:border-accent hover:bg-accent"
              >
                <ArrowPathIcon className="size-4" />
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-line bg-transparent px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Back home
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
