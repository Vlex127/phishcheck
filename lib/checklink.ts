export type RiskLevel = "low" | "medium" | "high";
export type CheckResult = { score: number; level: RiskLevel; reasons: string[] };

// Brand keyword -> official registrable domains
const BRANDS: Record<string, string[]> = {
  gtbank: ["gtbank.com", "gtco.com"],
  zenith: ["zenithbank.com"],
  access: ["accessbankplc.com"],
  uba: ["ubagroup.com"],
  firstbank: ["firstbanknigeria.com"],
  opay: ["opay.com", "opayweb.com"],
  palmpay: ["palmpay.com"],
  moniepoint: ["moniepoint.com"],
  kuda: ["kuda.com"],
  paystack: ["paystack.com"],
  flutterwave: ["flutterwave.com"],
  paypal: ["paypal.com"],
  mtn: ["mtn.ng", "mtn.com"],
  airtel: ["airtel.com.ng", "airtel.com"],
  jamb: ["jamb.gov.ng"],
  lasu: ["lasu.edu.ng"],
  nimc: ["nimc.gov.ng"],
  cbn: ["cbn.gov.ng"],
};

const SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "rb.gy", "cutt.ly", "is.gd", "shorturl.at"];
const RISKY_TLDS = ["xyz", "top", "click", "tk", "ml", "gq", "cf", "work", "loan", "icu", "buzz"];
const URGENT_WORDS = [
  "urgent", "immediately", "verify", "suspended", "restricted", "expires",
  "within 24 hours", "act now", "confirm your", "limited slots", "claim",
  "winner", "congratulations", "bvn", "otp", "pin",
];

function registrableDomain(host: string): string {
  const labels = host.split(".");
  if (labels.length <= 2) return host;
  const last = labels[labels.length - 1];
  const second = labels[labels.length - 2];
  const twoPartSlds = ["com", "edu", "gov", "org", "net", "sch"];
  if (last === "ng" && twoPartSlds.includes(second)) return labels.slice(-3).join(".");
  return labels.slice(-2).join(".");
}

export function checkLink(raw: string): CheckResult {
  const reasons: string[] = [];
  let score = 0;
  const add = (pts: number, why: string) => {
    score += pts;
    reasons.push(why);
  };

  const text = raw.trim();
  if (!text) return { score: 0, level: "low", reasons: ["Nothing to check."] };

  // Find a URL inside the text, or treat whole input as a URL
  const match = text.match(/(https?:\/\/[^\s]+)|(\b[a-z0-9.-]+\.[a-z]{2,}(\/[^\s]*)?)/i);
  const candidate = match ? match[0] : text;
  const withProto = /^https?:\/\//i.test(candidate) ? candidate : "http://" + candidate;

  let url: URL | null = null;
  try {
    url = new URL(withProto);
  } catch {
    add(2, "This doesn't look like a valid web address.");
  }

  if (url) {
    const host = url.hostname.toLowerCase();
    const labels = host.split(".");
    const tld = labels[labels.length - 1];
    const root = registrableDomain(host);

    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) add(4, "Uses a numeric IP address instead of a real domain name.");
    if (/^http:\/\//i.test(candidate)) add(1, "Not using HTTPS (no encryption).");
    if (candidate.includes("@")) add(3, "Contains '@', which can hide the real destination.");
    if (host.startsWith("xn--") || host.includes(".xn--")) add(3, "Uses punycode, which can disguise lookalike characters.");
    if (labels.length > 4) add(2, "Has many subdomains, a common way to fake a trusted name.");
    if (url.href.length > 100) add(1, "Unusually long address.");
    if ((host.match(/-/g) || []).length >= 2) add(2, "Domain has several hyphens, which is typical of fake sites.");
    if (RISKY_TLDS.includes(tld)) add(2, `The ending '.${tld}' is frequently used in scam sites.`);
    if (SHORTENERS.includes(root)) add(3, "Shortened link hides the real destination.");

    // Brand impersonation (also catches digit-for-letter tricks like paypa1, g0bank)
    const normalized = host.replace(/0/g, "o").replace(/1/g, "l").replace(/3/g, "e").replace(/5/g, "s");
    for (const [brand, officials] of Object.entries(BRANDS)) {
      if (officials.includes(root)) continue;
      if (host.includes(brand)) {
        add(5, `Mentions '${brand}' but the real domain is ${root}, not an official ${brand} site.`);
        break;
      }
      if (normalized.includes(brand)) {
        add(5, `Looks like '${brand}' with digits swapped for letters, but the real domain is ${root}.`);
        break;
      }
    }

    if (/(login|signin|verify|update|secure|account)/i.test(url.pathname + host)) {
      add(1, "Asks you to log in, verify or update, a common phishing theme.");
    }
  }

  const lower = text.toLowerCase();
  const hits = URGENT_WORDS.filter((w) => lower.includes(w));
  if (hits.length >= 2) add(2, `Pressure or lure wording found: ${hits.slice(0, 4).join(", ")}.`);
  else if (hits.length === 1) add(1, `Suspicious wording found: ${hits[0]}.`);

  const level: RiskLevel = score >= 5 ? "high" : score >= 2 ? "medium" : "low";
  if (reasons.length === 0) reasons.push("No common warning signs found. This does not guarantee it is safe.");
  return { score, level, reasons };
}
