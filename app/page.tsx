import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  InfoIcon,
  LinkIcon,
  QuizIcon,
} from "@/components/icons";

const SITE_URL = "https://phishcheck.com";

const habits = [
  {
    title: "Slow down",
    text: "Urgency is a tool. Take a breath before tapping, especially when a message threatens closure, loss, or a missed prize.",
  },
  {
    title: "Check the full address",
    text: "Look past the padlock and read the domain. A familiar name buried inside a longer address is not the real site.",
  },
  {
    title: "Keep codes private",
    text: "No bank, employer, or government office needs your OTP, PIN, or password over a message or phone call.",
  },
];

export const metadata: Metadata = {
  title: "PhishCheck — phishing awareness for LASU students",
  description:
    "Practise spotting phishing messages with a 10-question quiz and check suspicious links for common warning signs. Built by LASU CSC 333 Group 31.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main id="main-content" className="flex-1">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "PhishCheck",
          url: SITE_URL,
          description:
            "A free phishing-awareness quiz and rule-based suspicious link checker for LASU students.",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          isAccessibleForFree: true,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "NGN",
          },
          creator: {
            "@type": "Organization",
            name: "CSC 333, Group 31, LASU",
          },
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section
          aria-labelledby="hero-heading"
          className="border-b border-line pb-10 pt-8 sm:pb-14 sm:pt-12 lg:pb-16"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <div className="motion-safe:animate-fade-up">
              <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                <span aria-hidden="true" className="size-1.5 bg-accent" />
                Field brief 01 / CSC 333
              </p>

              <h1
                id="hero-heading"
                className="mt-4 max-w-2xl text-balance font-display text-[2.9rem] font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-6xl lg:text-[4.6rem]"
              >
                Spot the hook
                <span className="block text-accent">before it bites.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Learn the patterns behind phishing messages, then test your
                instincts against ten realistic scenarios from Nigeria. No login,
                no scoreboard, no data collected.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-px w-6 bg-accent" />
                  10 scenarios
                </span>
                <span aria-hidden="true" className="text-line">
                  /
                </span>
                <span>2 minutes</span>
                <span aria-hidden="true" className="text-line">
                  /
                </span>
                <span>100% local</span>
              </div>
            </div>

            <figure className="relative mx-auto w-full max-w-md motion-safe:animate-fade-up lg:mr-0">
              <div
                aria-hidden="true"
                className="absolute -left-2 -top-2 size-full border border-line"
              />
              <div className="relative border border-ink/70 bg-surface shadow-offset">
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <span className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
                    <InfoIcon className="size-3.5" />
                    Inbox / unverified
                  </span>
                  <span className="font-mono text-[9px] text-accent">14:02</span>
                </div>

                <div className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">GTBank Alerts</p>
                      <p className="mt-0.5 font-mono text-[10px] text-muted">
                        support@gtb-verify.ng
                      </p>
                    </div>
                    <span className="border border-line px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-muted">
                      SMS
                    </span>
                  </div>

                  <p className="mt-4 text-[15px] leading-6">
                    Your account has been{" "}
                    <mark className="bg-accent/15 px-0.5 font-semibold text-ink">
                      restricted
                    </mark>
                    . Verify your BVN within{" "}
                    <mark className="bg-accent/15 px-0.5 font-semibold text-ink">
                      24 hours
                    </mark>
                    :
                  </p>
                  <p className="mt-1 break-all font-mono text-xs text-accent underline decoration-accent/40 underline-offset-2">
                    gtbank-verify-ng.top/login
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {["Urgency", "Lookalike domain", "Requests BVN"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-line px-4 py-3">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
                    3 warning signs
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-danger">
                    <AlertTriangleIcon className="size-3.5" />
                    Do not tap
                  </span>
                </div>
              </div>
              <figcaption className="mt-3 text-right font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                Example generated for the quiz
              </figcaption>
            </figure>
          </div>
        </section>

        <dl
          aria-label="PhishCheck at a glance"
          className="grid grid-cols-3 divide-x divide-line border-b border-line"
        >
          <div className="py-5 pr-3 sm:px-5 sm:first:pl-0">
            <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
              Scenarios
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold sm:text-3xl">
              10
            </dd>
          </div>
          <div className="px-3 py-5 sm:px-5">
            <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
              Risk levels
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold sm:text-3xl">
              3
            </dd>
          </div>
          <div className="py-5 pl-3 sm:px-5 sm:last:pr-0">
            <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
              Data sent
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold text-safe sm:text-3xl">
              None
            </dd>
          </div>
        </dl>

        <section
          aria-labelledby="tools-heading"
          className="py-10 sm:py-14"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Choose your route
              </p>
              <h2
                id="tools-heading"
                className="mt-2 max-w-xl font-display text-3xl font-bold leading-[1.05] sm:text-4xl"
              >
                Two ways to test your instincts.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted">
              Both tools run entirely in your browser and give you a plain-language
              explanation, not just a verdict.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/quiz"
              className="group relative flex h-full flex-col border border-line bg-surface p-5 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-ink hover:shadow-offset-sm sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  <QuizIcon className="size-4 text-accent" />
                  01 / Quiz
                </span>
                <span className="flex size-9 items-center justify-center border border-line text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-canvas">
                  <ArrowRightIcon className="size-4" />
                </span>
              </div>

              <h3 className="mt-10 font-display text-3xl font-bold tracking-[-0.045em]">
                Read the room.
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                Ten real-world SMS, WhatsApp, email, social media, and website
                scenarios. Decide if each one is phishing or safe, then learn what
                gave it away.
              </p>

              <div className="mt-auto flex items-center gap-2 pt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-accent">
                <span aria-hidden="true" className="size-1.5 bg-accent" />
                10 messages / 2 min
              </div>
            </Link>

            <Link
              href="/checker"
              className="group relative flex h-full flex-col border border-line bg-surface p-5 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-ink hover:shadow-offset-sm sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  <LinkIcon className="size-4 text-accent" />
                  02 / Link checker
                </span>
                <span className="flex size-9 items-center justify-center border border-line text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-canvas">
                  <ArrowRightIcon className="size-4" />
                </span>
              </div>

              <h3 className="mt-10 font-display text-3xl font-bold tracking-[-0.045em]">
                Inspect the link.
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                Paste a link or a whole message. Get a low, medium, or high risk
                rating and a plain-language list of the warning signs found.
              </p>

              <div className="mt-auto flex items-center gap-2 pt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-accent">
                <span aria-hidden="true" className="size-1.5 bg-accent" />
                Paste / inspect / decide
              </div>
            </Link>
          </div>

          <p className="mt-6 flex gap-2.5 border-l-2 border-accent pl-3 text-xs leading-5 text-muted">
            <InfoIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            <span>
              Research note: PhishCheck supports a CSC 333 study on phishing
              awareness among LASU students. Everything runs in your browser, with
              no login and no data collection.
            </span>
          </p>
        </section>

        <section
          aria-labelledby="habits-heading"
          className="border-t border-line py-10 sm:py-14"
        >
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Field rules
              </p>
              <h2
                id="habits-heading"
                className="mt-2 max-w-md font-display text-3xl font-bold leading-[1.05] sm:text-4xl"
              >
                Three habits that make phishing harder.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                You do not need to memorise every scam. These three checks catch
                many of them.
              </p>
            </div>

            <ol className="divide-y divide-line border-y border-line">
              {habits.map((habit, index) => (
                <li
                  key={habit.title}
                  className="grid grid-cols-[2.25rem_1fr] gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:gap-4"
                >
                  <span className="pt-0.5 font-mono text-xs font-semibold text-accent">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">
                      {habit.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {habit.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
