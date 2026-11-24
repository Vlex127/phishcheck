import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  LinkIcon,
  QuizIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex-1">
      <div className="mx-auto flex max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
          Error / 404
        </p>
        <div className="mt-4 border-l-2 border-accent pl-5 sm:pl-7">
          <h1 className="max-w-2xl text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.06em] sm:text-7xl">
            This page is not on the map.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            The address may be old or mistyped. You can head home, or jump
            straight into one of the tools.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink bg-ink px-5 text-sm font-semibold text-canvas transition-colors hover:border-accent hover:bg-accent"
          >
            Back to home
            <ArrowRightIcon className="size-4" />
          </Link>
          <Link
            href="/quiz"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-line bg-transparent px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            <QuizIcon className="size-4" />
            Take the quiz
          </Link>
          <Link
            href="/checker"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-line bg-transparent px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            <LinkIcon className="size-4" />
            Check a link
          </Link>
        </div>
      </div>
    </main>
  );
}
