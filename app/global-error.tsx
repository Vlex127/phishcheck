"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3efe5",
          color: "#18221c",
          fontFamily:
            "'Instrument Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: "24px",
        }}
      >
        <main
          style={{
            width: "100%",
            maxWidth: "560px",
            border: "1px solid #d6cfbf",
            background: "#fbf8f1",
          }}
        >
          <div style={{ height: "6px", background: "#a93722" }} />
          <div style={{ padding: "32px" }}>
            <p
              style={{
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#a93722",
              }}
            >
              PhishCheck / system error
            </p>
            <h1
              style={{
                margin: "12px 0 0",
                fontFamily:
                  "'Bricolage Grotesque', 'Instrument Sans', system-ui, sans-serif",
                fontSize: "34px",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              Something went wrong.
            </h1>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: "16px",
                lineHeight: 1.6,
                color: "#5c665d",
              }}
            >
              The page could not load. Try again, or go home and reload the app.
            </p>
            {error.digest && (
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#5c665d",
                  wordBreak: "break-all",
                }}
              >
                Reference / {error.digest}
              </p>
            )}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "24px",
              }}
            >
              <button
                type="button"
                onClick={reset}
                style={{
                  minHeight: "48px",
                  border: "1px solid #18221c",
                  background: "#18221c",
                  color: "#f3efe5",
                  padding: "0 20px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
              <Link
                href="/"
                style={{
                  minHeight: "48px",
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid #d6cfbf",
                  color: "#18221c",
                  padding: "0 20px",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Back home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
