export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold tracking-[-0.04em]">
              PhishCheck
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted">
              A student research project on phishing awareness. No personal data
              is collected, and nothing you type leaves your browser.
            </p>
          </div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            CSC 333, Group 31, LASU
          </p>
        </div>
      </div>
    </footer>
  );
}
