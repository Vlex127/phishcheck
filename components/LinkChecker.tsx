"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { checkLink } from "@/lib/checklink";
import type { CheckResult } from "@/lib/checklink";
import { RiskBadge } from "@/components/RiskBadge";
import {
  ArrowRightIcon,
  InfoIcon,
  SearchIcon,
} from "@/components/icons";

const examples = [
  {
    label: "Fake bank login",
    value: "http://gtbank-verify-ng.top/login",
  },
  {
    label: "Prize message with a shortened link",
    value:
      "Congratulations! You have won ₦500,000. Claim now: bit.ly/fgn-scholar26",
  },
  {
    label: "The real LASU website",
    value: "https://www.lasu.edu.ng",
  },
];

const resultHeadings = {
  low: "No strong warning signs found",
  medium: "Some warning signs found",
  high: "Several warning signs found",
};

const riskBars: Record<CheckResult["level"], string> = {
  low: "bg-safe",
  medium: "bg-caution",
  high: "bg-danger",
};

const nextSteps: Record<CheckResult["level"], string[]> = {
  low: [
    "Check the sender and the full domain before you tap.",
    "Never enter a password, PIN, or OTP after following a link you did not expect.",
  ],
  medium: [
    "Open the organisation’s official app or type its known address instead of using this link.",
    "Verify with the sender through a different channel before sharing any information.",
  ],
  high: [
    "Do not open the link or reply to the message.",
    "If you already shared details, contact the organisation through its official app or website and change your password.",
    "Report the message to the platform where you received it.",
  ],
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function LinkChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function runCheck(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;

    setInput(trimmed);
    setResult(checkLink(trimmed));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCheck(input);
  }

  function handleInputChange(value: string) {
    setInput(value);
    if (result) setResult(null);
  }

  function handleClear() {
    setInput("");
    setResult(null);
    window.requestAnimationFrame(() => textareaRef.current?.focus());
  }

  return (
    <div>
      <div className="border border-line bg-surface shadow-offset-sm">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent">
            Evidence intake / 01
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            Local check
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <label
            htmlFor="checker-input"
            className="block font-display text-lg font-bold tracking-[-0.03em]"
          >
            Link or message to check
          </label>
          <p
            id="checker-hint"
            className="mt-1 text-sm leading-6 text-muted"
          >
            Paste the full message if you can. The checker looks at both the web
            address and the wording.
          </p>

          <textarea
            ref={textareaRef}
            id="checker-input"
            name="message"
            rows={5}
            maxLength={4000}
            value={input}
            onChange={(event) => handleInputChange(event.target.value)}
            aria-describedby="checker-hint checker-privacy"
            placeholder="Paste a link or message here…"
            className="mt-3 w-full resize-y border border-line bg-canvas px-4 py-3 text-base leading-7 text-ink placeholder:text-muted/70 focus:border-accent"
          />

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              id="checker-privacy"
              className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
            >
              Checked locally. Nothing is sent or stored.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                disabled={!input.trim()}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-ink bg-ink px-5 text-sm font-semibold text-canvas transition-colors hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:border-line disabled:bg-canvas disabled:text-muted sm:w-auto"
              >
                <SearchIcon className="size-4" />
                Check link
              </button>
              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex min-h-12 w-full items-center justify-center border border-line bg-transparent px-5 text-sm font-semibold text-ink transition-colors hover:border-ink sm:w-auto"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="border-t border-line px-4 pb-4 pt-4 sm:px-6 sm:pb-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-lg font-bold tracking-[-0.03em]">
              Try a sample
            </h2>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              3 records
            </p>
          </div>
          <p className="mt-1 text-xs leading-5 text-muted">
            Tap a sample to fill the box and check it right away.
          </p>

          <ul className="mt-2 divide-y divide-line border-y border-line">
            {examples.map((example, index) => (
              <li key={example.label}>
                <button
                  type="button"
                  onClick={() => runCheck(example.value)}
                  className="group flex min-h-14 w-full items-start gap-3 py-3 text-left"
                >
                  <span className="mt-0.5 font-mono text-[9px] font-semibold text-accent">
                    {pad(index + 1)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold transition-colors group-hover:text-accent">
                      {example.label}
                    </span>
                    <span className="mt-0.5 block break-all font-mono text-[10px] leading-5 text-muted">
                      {example.value}
                    </span>
                  </span>
                  <ArrowRightIcon className="mt-1 size-4 shrink-0 text-muted transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-accent" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true" className="mt-6">
        {result && (
          <article className="border border-line bg-surface">
            <div
              aria-hidden="true"
              className={`h-1.5 ${riskBars[result.level]}`}
            />

            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent">
                    Risk assessment / 01
                  </p>
                  <h2 className="mt-2 max-w-xl text-balance font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                    {resultHeadings[result.level]}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    These are the warning signs detected in what you pasted.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <RiskBadge level={result.level} />
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                    Rule score {pad(result.score)}
                  </p>
                </div>
              </div>

              <h3 className="mt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-muted">
                Signals detected / {pad(result.reasons.length)}
              </h3>
              <ol className="mt-2 divide-y divide-line border-y border-line">
                {result.reasons.map((reason, index) => (
                  <li
                    key={`${reason}-${index}`}
                    className="grid grid-cols-[2rem_1fr] gap-3 py-3 text-sm leading-6"
                  >
                    <span className="pt-0.5 font-mono text-[9px] font-semibold text-accent">
                      {pad(index + 1)}
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 border-l-2 border-accent pl-4">
                <h3 className="font-display text-lg font-bold tracking-[-0.03em]">
                  What to do next
                </h3>
                <ul className="mt-2 space-y-2">
                  {nextSteps[result.level].map((step) => (
                    <li
                      key={step}
                      className="flex gap-2.5 text-sm leading-6 text-muted"
                    >
                      <ArrowRightIcon className="mt-1 size-3.5 shrink-0 text-accent" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex gap-3 border border-caution/40 bg-caution/10 p-4 text-sm leading-6">
                <InfoIcon className="mt-0.5 size-4 shrink-0 text-caution" />
                <p>
                  <strong className="font-semibold">
                    Low risk does not mean safe.
                  </strong>{" "}
                  This tool uses simple rules and cannot guarantee safety.
                </p>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
