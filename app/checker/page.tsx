"use client";

import { LinkChecker } from "@/components/LinkChecker";

export default function CheckerPage() {
  return (
    <main id="main-content" className="flex-1">
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <header className="border-b border-line pb-6 sm:pb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Field test / 02
              </p>
              <h1 className="mt-2 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-5xl">
                Inspect the link.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                Paste a link, or the whole message it came in. PhishCheck looks for
                common warning signs such as lookalike domains, shortened links,
                risky endings, and pressure wording.
              </p>
            </div>

            <div className="flex shrink-0 gap-4 border-t border-line pt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] sm:border-t-0 sm:pt-0">
              <div>
                <p className="text-muted">Mode</p>
                <p className="mt-1 text-ink">Local only</p>
              </div>
              <div className="border-l border-line pl-4">
                <p className="text-muted">Output</p>
                <p className="mt-1 text-ink">Risk + signs</p>
              </div>
            </div>
          </div>
        </header>

        <div className="pt-6 sm:pt-8">
          <LinkChecker />
        </div>
      </div>
    </main>
  );
}
