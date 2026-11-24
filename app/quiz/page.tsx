"use client";

import { QuizExperience } from "@/components/QuizExperience";

export default function QuizPage() {
  return (
    <main id="main-content" className="flex-1">
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <header className="border-b border-line pb-6 sm:pb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Field test / 01
              </p>
              <h1 className="mt-2 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-5xl">
                Can you spot the bait?
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                Read each message and decide whether it is phishing or safe. You
                will get the answer and an explanation before moving on.
              </p>
            </div>

            <div className="flex shrink-0 gap-4 border-t border-line pt-3 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] sm:border-t-0 sm:pt-0">
              <div>
                <p className="text-muted">Length</p>
                <p className="mt-1 text-ink">10 messages</p>
              </div>
              <div className="border-l border-line pl-4">
                <p className="text-muted">Time</p>
                <p className="mt-1 text-ink">~2 min</p>
              </div>
            </div>
          </div>
        </header>

        <div className="pt-6 sm:pt-8">
          <QuizExperience />
        </div>
      </div>
    </main>
  );
}
