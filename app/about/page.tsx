import type { Metadata } from "next";
import Link from "next/link";

const credits = [
  { name: "Akapo Fisayomi Beatrice", matric: "240591031" },
  { name: "Olufowobi Umar Adedoyin", matric: "240591164" },
  { name: "Adebayo Victor", matric: "240591221" },
  { name: "Iwuno ChukwuEbuka Vincent", matric: "240591107" },
  { name: "Ogbonna Peter Izuchukwu", matric: "240591142" },
  { name: "Zinsu sezonsu Emmanuel", matric: "240591300" },
] as const;

export const metadata: Metadata = {
  title: "About PhishCheck",
  description:
    "About PhishCheck — CSC 333 Group 31 at Lagos State University, LASU.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="flex-1">
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            CSC 333 / LASU / About
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-4xl">
            About PhishCheck
          </h1>
        </div>

        <section
          aria-labelledby="credits-heading"
          className="border-b border-line py-8 sm:py-10"
        >
          <h2
            id="credits-heading"
            className="font-display text-2xl font-extrabold tracking-[-0.04em]"
          >
            Project Credits and Student Numbers
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            PhishCheck is a CSC 333 Group 31 project at LASU. The browser tools
            are intentionally small, mobile-first, privacy-preserving, and useful
            for practical phishing-awareness practice.
          </p>
          <ul className="mt-6 space-y-2">
            {credits.map((credit) => (
              <li
                key={credit.name}
                className="font-mono text-[11px] tracking-[0.05em] text-ink"
              >
                <span className="font-semibold uppercase">{credit.name}</span>{" "}
                — Matric: {credit.matric}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="what-heading"
          className="border-b border-line py-8 sm:py-10"
        >
          <h2
            id="what-heading"
            className="font-display text-2xl font-extrabold tracking-[-0.04em]"
          >
            What PhishCheck Is
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            A small web application built for a LASU CSC 333 research project.
            It offers a ten-scenario phishing quiz and a rule-based suspicious
            link checker. It does not require an account and does not send the
            things you type anywhere.
          </p>
        </section>

        <section
          aria-labelledby="research-heading"
          className="border-b border-line py-8 sm:py-10"
        >
          <h2
            id="research-heading"
            className="font-display text-2xl font-extrbold tracking-[-0.04em]"
          >
            Research Context and Privacy
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            The app supports a CSC 333 study on phishing and social engineering
            awareness among LASU students. Everything runs in the browser, with
            no login and no data collection.
          </p>
        </section>

        <section aria-labelledby="links-heading" className="py-8 sm:py-10">
          <h2 id="links-heading" className="font-display text-2xl font-extrbold tracking-[-0.04em]">
            Quick Links
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/" className="rounded-sm border border-line px-3 py-2 text-sm font-semibold text-ink hover:border-ink">Home</Link>
            <Link href="/quiz" className="rounded-sm border border-line px-3 py-2 text-sm font-semibold text-ink hover:border-ink">Quiz</Link>
            <Link href="/checker" className="rounded-sm border border-line px-3 py-2 text-sm font-semibold text-ink hover:border-ink">Link Checker</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
