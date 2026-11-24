import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PhishCheck — phishing awareness quiz and link checker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#f3efe5",
          color: "#18221c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              position: "relative",
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#18221c",
              color: "#f3efe5",
              fontSize: 42,
              fontWeight: 800,
            }}
          >
            P
            <div
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                width: 16,
                height: 16,
                borderRadius: 16,
                background: "#a93d22",
                border: "3px solid #f3efe5",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.04em" }}>
              PhishCheck
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#5c665d",
              }}
            >
              CSC 333 / LASU
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#a93d22",
            }}
          >
            <div style={{ width: 40, height: 2, background: "#a93d22" }} />
            Field brief 01
          </div>
          <div
            style={{
              maxWidth: 940,
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: "-0.055em",
            }}
          >
            <div>Spot the hook</div>
            <div style={{ color: "#a93d22" }}>before it bites.</div>
          </div>
          <div style={{ fontSize: 27, color: "#5c665d" }}>
            10 realistic scenarios. One rule-based link checker.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #d6cfbf",
            paddingTop: 24,
            fontSize: 19,
            color: "#5c665d",
          }}
        >
          <span>CSC 333, Group 31, LASU</span>
          <span>100% local · No data collected</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
