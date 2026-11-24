export type RiskLevel = "low" | "medium" | "high";
export type CheckResult = { score: number; level: RiskLevel; reasons: string[] };

type UrlAssessment = CheckResult & { root: string | null };

const MEDIUM_RISK_SCORE = 3;
const HIGH_RISK_SCORE = 6;

// Brand keyword -> official registrable domains.
const BRANDS: Record<string, string[]> = {
  gtbank: ["gtbank.com", "gtco.com"],
  zenith: ["zenithbank.com"],
  access: ["accessbankplc.com"],
  uba: ["ubagroup.com"],
  firstbank: ["firstbanknigeria.com"],
  fcmb: ["fcmb.com"],
  fidelity: ["fidelitybank.ng"],
  unionbank: ["unionbankng.com"],
  wema: ["wemabank.com"],
  stanbic: ["stanbicibtcbank.com"],
  ecobank: ["ecobank.com"],
  opay: ["opay.com", "opayweb.com"],
  palmpay: ["palmpay.com"],
  moniepoint: ["moniepoint.com"],
  kuda: ["kuda.com"],
  paystack: ["paystack.com"],
  flutterwave: ["flutterwave.com"],
  remita: ["remita.net"],
  interswitch: ["interswitchgroup.com"],
  paypal: ["paypal.com"],
  microsoft: ["microsoft.com", "live.com", "office.com", "office365.com"],
  google: ["google.com", "googleusercontent.com"],
  apple: ["apple.com", "icloud.com"],
  whatsapp: ["whatsapp.com", "wa.me"],
  facebook: ["facebook.com", "fb.com"],
  instagram: ["instagram.com"],
  netflix: ["netflix.com"],
  mtn: ["mtn.ng", "mtn.com"],
  airtel: ["airtel.com.ng", "airtel.com"],
  glo: ["gloworld.com"],
  jamb: ["jamb.gov.ng"],
  lasu: ["lasu.edu.ng"],
  nimc: ["nimc.gov.ng"],
  cbn: ["cbn.gov.ng"],
};

const SHORTENERS = new Set([
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "rb.gy",
  "cutt.ly",
  "is.gd",
  "shorturl.at",
  "ow.ly",
  "buff.ly",
  "rebrand.ly",
  "tiny.cc",
  "lnkd.in",
  "goo.gl",
]);

const RISKY_TLDS = new Set([
  "xyz",
  "top",
  "click",
  "tk",
  "ml",
  "gq",
  "cf",
  "work",
  "loan",
  "icu",
  "buzz",
  "zip",
  "mov",
  "rest",
  "cam",
  "support",
  "country",
  "stream",
]);

const SHARED_HOSTS = new Set([
  "pages.dev",
  "workers.dev",
  "vercel.app",
  "netlify.app",
  "github.io",
  "web.app",
  "firebaseapp.com",
  "blogspot.com",
  "ngrok-free.app",
  "trycloudflare.com",
]);

const DOWNLOAD_EXTENSIONS = new Set([
  "apk",
  "exe",
  "msi",
  "scr",
  "bat",
  "cmd",
  "jar",
  "js",
  "iso",
  "dmg",
  "pkg",
  "zip",
  "rar",
  "7z",
  "docm",
  "xlsm",
  "pptm",
]);

const URL_WORDS = [
  "login",
  "signin",
  "verify",
  "verification",
  "update",
  "secure",
  "security",
  "account",
  "confirm",
  "unlock",
  "recover",
  "password",
  "credential",
  "otp",
  "bvn",
  "wallet",
  "payment",
  "invoice",
  "gift",
  "claim",
];

const MESSAGE_GROUPS = [
  {
    points: 2,
    label: "Urgency or deadline wording",
    words: [
      "urgent",
      "immediately",
      "act now",
      "within 24 hours",
      "expires today",
      "limited time",
      "last warning",
      "final notice",
      "deadline",
    ],
  },
  {
    points: 2,
    label: "Threat or account-pressure wording",
    words: [
      "suspended",
      "restricted",
      "blocked",
      "deactivated",
      "unauthorised transaction",
      "account will be closed",
      "legal action",
      "penalty",
    ],
  },
  {
    points: 3,
    label: "Request for sensitive information",
    words: [
      "send your otp",
      "share your otp",
      "verification code",
      "password",
      "pin",
      "bvn",
      "card number",
      "cvv",
      "bank details",
      "login details",
      "recovery phrase",
      "seed phrase",
    ],
  },
  {
    points: 2,
    label: "Unexpected verification request",
    words: [
      "verify your account",
      "confirm your identity",
      "update your details",
      "unlock your account",
      "sign in to continue",
      "security check",
    ],
  },
  {
    points: 2,
    label: "Prize, payment or reward lure",
    words: [
      "winner",
      "congratulations",
      "claim your prize",
      "free gift",
      "giveaway",
      "lottery",
      "refund",
      "cash reward",
      "scholarship",
      "investment return",
    ],
  },
  {
    points: 2,
    label: "Payment or transfer pressure",
    words: [
      "send money",
      "make payment",
      "transfer now",
      "payment failed",
      "unpaid fee",
      "outstanding balance",
      "debit alert",
    ],
  },
  {
    points: 3,
    label: "Risky download or security-bypass instruction",
    words: [
      "enable macros",
      "disable antivirus",
      "disable security",
      "install this app",
      "download the apk",
      "run this file",
      "allow unknown sources",
    ],
  },
] as const;

const CANDIDATE_PATTERN =
  /\b(?:javascript|data|file|vbscript|ftp|sftp|intent|market|chrome|ms-appx):(?:\/\/)?[^\s<>"']+|(?:https?:\/\/|www\.)[^\s<>"']+|\b(?:[a-z0-9.-]+\.[a-z]{2,})@(?:[a-z0-9.-]+\.[a-z]{2,})(?:\/[^\s<>"']*)?|\[[0-9a-f:]+\](?:\/[^\s<>"']*)?|\b\d{1,3}(?:\.\d{1,3}){3}(?:\/[^\s<>"']*)?|\b(?:xn--)?[a-z0-9](?:[a-z0-9-]{0,62}\.)+(?:xn--)?[a-z]{2,63}(?:\/[^\s<>"']*)?/giu;
const BIDI_CONTROL_PATTERN = /[\u202A-\u202E\u2066-\u2069]/u;
const ZERO_WIDTH_PATTERN = /[\u200B-\u200D\u2060\uFEFF]/u;
const GENERIC_BRANDS = new Set(["access"]);

function registrableDomain(host: string): string {
  const cleanedHost = host.replace(/^\[|\]$/g, "");
  if (cleanedHost.includes(":")) return cleanedHost;

  const labels = cleanedHost.split(".");
  if (labels.length <= 2) return labels.join(".");

  const last = labels.at(-1) ?? "";
  const second = labels.at(-2) ?? "";
  const countrySecondLevels = new Set([
    "ac",
    "co",
    "com",
    "edu",
    "gov",
    "net",
    "org",
    "sch",
  ]);

  if (last.length === 2 && countrySecondLevels.has(second)) {
    return labels.slice(-3).join(".");
  }

  return labels.slice(-2).join(".");
}

function siteBoundary(host: string): string {
  const cleanedHost = host.replace(/^\[|\]$/g, "");
  const root = registrableDomain(cleanedHost);
  if (!SHARED_HOSTS.has(root)) return root;

  const labels = cleanedHost.split(".");
  const rootLabels = root.split(".").length;
  return labels.slice(-(rootLabels + 1)).join(".");
}

function trimCandidate(candidate: string): string {
  let cleaned = candidate.trim().replace(/[.,;:!?]+$/u, "");
  const pairs = [
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
  ] as const;

  for (const [opener, closer] of pairs) {
    const opens = cleaned.split(opener).length - 1;
    let extraClosers = cleaned.split(closer).length - 1 - opens;
    while (extraClosers > 0 && cleaned.endsWith(closer)) {
      cleaned = cleaned.slice(0, -1);
      extraClosers -= 1;
    }
  }

  return cleaned;
}

function extractCandidates(text: string): string[] {
  return [...new Set((text.match(CANDIDATE_PATTERN) ?? []).map(trimCandidate))];
}

function normalizeLookalikes(value: string): string {
  return value
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/[1!|]/g, "l")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/8/g, "b")
    .replace(/@/g, "a")
    .replace(/\$/g, "s");
}

function levenshtein(a: string, b: string): number {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }

  return previous[b.length];
}

function isIpv4(host: string): boolean {
  const parts = host.split(".");
  return (
    parts.length === 4 &&
    parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255)
  );
}

function isIpv6(host: string): boolean {
  const cleaned = host.replace(/^\[|\]$/g, "");
  return cleaned.includes(":") && /^[0-9a-f:]+$/i.test(cleaned);
}

function isPrivateHost(host: string): boolean {
  const cleaned = host.replace(/^\[|\]$/g, "").toLowerCase();
  if (
    cleaned === "localhost" ||
    cleaned.endsWith(".localhost") ||
    cleaned.endsWith(".local")
  ) {
    return true;
  }
  if (isIpv4(cleaned)) {
    if (/^(?:127|10)\./.test(cleaned)) return true;
    if (/^192\.168\./.test(cleaned)) return true;
    if (/^172\.(?:1[6-9]|2\d|3[01])\./.test(cleaned)) return true;
    return /^(?:0\.0\.0\.0|169\.254\.)/.test(cleaned);
  }
  if (isIpv6(cleaned)) {
    return cleaned === "::1" || /^(?:fc|fd|fe8|fe9|fea|feb)/.test(cleaned);
  }
  return false;
}

function addUnique(
  reasons: string[],
  seen: Set<string>,
  points: number,
  reason: string,
): number {
  if (seen.has(reason)) return 0;
  seen.add(reason);
  reasons.push(reason);
  return points;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsTerm(text: string, term: string): boolean {
  const escaped = escapeRegex(term);
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, "i").test(text);
}

function isNegatedAdvice(text: string, term: string): boolean {
  const escaped = escapeRegex(term);
  return new RegExp(
    `(?:never|do not|don't|dont|avoid|refuse to)\\s+(?:[a-z]+\\s+){0,4}${escaped}`,
    "i",
  ).test(text);
}

function decodeRepeatedly(value: string, limit = 3): string {
  let decoded = value;
  for (let index = 0; index < limit; index += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  return decoded;
}

function assessUrl(candidate: string): UrlAssessment {
  const reasons: string[] = [];
  const seen = new Set<string>();
  let score = 0;
  const add = (points: number, reason: string) => {
    score += addUnique(reasons, seen, points, reason);
  };

  const scheme = candidate.match(/^([a-z][a-z0-9+.-]*):/i)?.[1].toLowerCase();
  if (scheme && ["javascript", "data", "file", "vbscript"].includes(scheme)) {
    add(7, "Uses a dangerous link scheme that can execute code or expose local data.");
    return { score, level: "high", reasons, root: null };
  }
  if (scheme && ["intent", "market", "chrome", "ms-appx"].includes(scheme)) {
    add(5, `Uses the external application scheme '${scheme}:'.`);
    return { score, level: "medium", reasons, root: null };
  }
  if (scheme && !["http", "https"].includes(scheme)) {
    add(3, `Uses the uncommon link scheme '${scheme}:'.`);
    return { score, level: "medium", reasons, root: null };
  }

  if (ZERO_WIDTH_PATTERN.test(candidate)) {
    add(2, "Contains zero-width characters that make the address harder to inspect.");
  }

  const explicitScheme = /^https?:\/\//i.test(candidate);
  const normalizedCandidate = candidate.startsWith("www.")
    ? `https://${candidate}`
    : explicitScheme
      ? candidate
      : `https://${candidate}`;

  let url: URL;
  try {
    url = new URL(normalizedCandidate);
  } catch {
    add(2, "This looks like a web address, but it could not be parsed safely.");
    return { score, level: "low", reasons, root: null };
  }

  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  const cleanedHost = host.replace(/^\[|\]$/g, "");
  const labels = cleanedHost.split(".");
  const root = registrableDomain(cleanedHost);
  const boundary = siteBoundary(cleanedHost);
  const tld = labels.at(-1) ?? "";
  const rawPath = `${url.pathname}${url.search}${url.hash}`;
  const decodedPath = (() => {
    try {
      return decodeURIComponent(rawPath);
    } catch {
      return rawPath;
    }
  })();

  if (url.protocol === "http:") {
    add(2, "Uses HTTP instead of encrypted HTTPS.");
  }
  const ipLiteral = isIpv4(cleanedHost) || isIpv6(cleanedHost);
  if (url.username || url.password) {
    add(6, "Contains user-information or '@', which can hide the real destination.");
  }
  if (ipLiteral) {
    add(4, "Uses a numeric IP address instead of a normal domain name.");
  }
  if (isPrivateHost(cleanedHost)) {
    add(3, "Points to a local or private-network address rather than a public website.");
  }
  if (cleanedHost.startsWith("xn--") || cleanedHost.includes(".xn--")) {
    add(4, "Uses punycode, which can disguise lookalike international characters.");
  }
  if (labels.length > 4) {
    add(2, "Has many subdomains, which can place a trusted name far from the real domain.");
  }
  if (cleanedHost.length > 60 || labels.some((label) => label.length > 30)) {
    add(1, "Uses an unusually long domain name.");
  }
  if (url.href.length > 140) {
    add(1, "Uses an unusually long web address.");
  }
  if ((cleanedHost.replace(/xn--/g, "").match(/-/g) ?? []).length >= 2) {
    add(1, "The domain contains several hyphens, a common impersonation pattern.");
  }
  if (RISKY_TLDS.has(tld)) {
    add(3, `The ending '.${tld}' is frequently abused in scam links.`);
  }
  if (SHORTENERS.has(root)) {
    add(4, "Uses a shortened link that hides the final destination.");
  }
  if (SHARED_HOSTS.has(root)) {
    add(1, "Uses a shared hosting domain; verify who created this specific page.");
  }
  if (!cleanedHost.includes(".") && !ipLiteral && !isPrivateHost(cleanedHost)) {
    add(3, "Uses a single-label host instead of a normal public domain name.");
  }

  const defaultPort =
    (url.protocol === "https:" && (!url.port || url.port === "443")) ||
    (url.protocol === "http:" && (!url.port || url.port === "80"));
  if (url.port && !defaultPort) {
    add(2, `Uses the unusual network port ${url.port}.`);
  }

  const hostTokens = labels.flatMap((label) => label.split("-")).filter(Boolean);
  const normalizedTokens = hostTokens.map(normalizeLookalikes);
  const officialRoots = new Set(Object.values(BRANDS).flat());
  const urlContext = `${cleanedHost}${decodedPath}`.toLowerCase();
  const hasSensitiveContext = URL_WORDS.some((word) => containsTerm(urlContext, word));

  if (!officialRoots.has(root)) {
    brandLoop: for (const [brand, officials] of Object.entries(BRANDS)) {
      if (officials.includes(root)) continue;

      const officialDomainLabels = officials.map((domain) =>
        normalizeLookalikes(domain.split(".")[0]),
      );
      if (officialDomainLabels.some((label) => normalizedTokens.includes(label))) {
        add(
          6,
          `Embeds an official-looking ${brand} domain label, but the real domain is ${root}.`,
        );
        break brandLoop;
      }

      for (let index = 0; index < hostTokens.length; index += 1) {
        const token = hostTokens[index];
        const normalized = normalizedTokens[index];
        const affix = normalized.startsWith(brand)
          ? normalized.slice(brand.length)
          : normalized.endsWith(brand)
            ? normalized.slice(0, -brand.length)
            : "";
        const directMention =
          ((!GENERIC_BRANDS.has(brand) || hasSensitiveContext) &&
            (token === brand || normalized === brand)) ||
          (Boolean(affix) && URL_WORDS.some((word) => affix.includes(word)));

        if (directMention) {
          add(
            6,
            `Looks like '${brand}', but the real domain is ${root}, not an official ${brand} site.`,
          );
          break brandLoop;
        }

        if (
          brand.length >= 5 &&
          normalized.length >= brand.length - 1 &&
          normalized.length <= brand.length + 1 &&
          levenshtein(normalized, brand) === 1
        ) {
          add(
            6,
            `The domain contains '${token}', which is one character away from '${brand}'.`,
          );
          break brandLoop;
        }
      }
    }
  }

  const suspiciousUrlWords = URL_WORDS.filter((word) => containsTerm(urlContext, word));
  if (suspiciousUrlWords.length >= 2) {
    add(
      2,
      `The address combines sensitive-action words: ${suspiciousUrlWords.slice(0, 4).join(", ")}.`,
    );
  } else if (suspiciousUrlWords.length === 1) {
    add(1, `The address contains the sensitive-action word '${suspiciousUrlWords[0]}'.`);
  }

  const downloadSources = [
    decodeRepeatedly(url.pathname),
    ...[...url.searchParams.values()].map((value) => decodeRepeatedly(value)),
  ];
  const riskyDownload = downloadSources
    .map((value) => value.match(/\.([a-z0-9]{2,5})(?:$|[?#])/i)?.[1].toLowerCase())
    .find((extension) => extension && DOWNLOAD_EXTENSIONS.has(extension));
  if (riskyDownload) {
    add(4, `Links directly to a potentially risky .${riskyDownload} download.`);
  }
  if (/(?:%00|%0d|%0a|%2f|%5c|%40|\\)/i.test(rawPath)) {
    add(3, "Uses encoded separators, control characters or backslashes to obscure the address.");
  } else if ((rawPath.match(/%[0-9a-f]{2}/gi) ?? []).length >= 4) {
    add(2, "Uses heavy percent-encoding that makes the destination harder to read.");
  }
  if (/\/\//.test(url.pathname.slice(1))) {
    add(2, "Contains extra slashes in the path that may disguise another destination.");
  }
  if ([...url.searchParams.keys()].length >= 6) {
    add(1, "Contains an unusually large number of query parameters.");
  }

  const redirectKeys = new Set([
    "url",
    "uri",
    "redirect",
    "redirect_url",
    "return",
    "returnurl",
    "next",
    "continue",
    "dest",
    "destination",
  ]);
  for (const [key, rawValue] of url.searchParams.entries()) {
    if (!redirectKeys.has(key.toLowerCase())) continue;
    const value = decodeRepeatedly(rawValue);
    if (/^(?:javascript|data|file|vbscript):/i.test(value)) {
      add(6, "Contains a redirect parameter with a dangerous executable scheme.");
      break;
    }
    try {
      const nested = new URL(value, url.origin);
      const nestedBoundary = siteBoundary(nested.hostname);
      if (nested.hostname && nestedBoundary !== boundary) {
        add(4, `Contains a redirect to a different site: ${nestedBoundary}.`);
        break;
      }
    } catch {
      // Ignore non-URL values.
    }
  }

  const digitHeavyLabel = !ipLiteral && labels.find((label) => {
    const digits = (label.match(/\d/g) ?? []).length;
    return label.length >= 8 && digits >= 4 && digits / label.length >= 0.3;
  });
  if (digitHeavyLabel) {
    add(2, "The domain contains an unusually digit-heavy label.");
  }

  const level: RiskLevel =
    score >= HIGH_RISK_SCORE ? "high" : score >= MEDIUM_RISK_SCORE ? "medium" : "low";
  return { score, level, reasons, root: boundary };
}

export function checkLink(raw: string): CheckResult {
  const text = raw.trim();
  if (!text) return { score: 0, level: "low", reasons: ["Nothing to check."] };

  const reasons: string[] = [];
  const seen = new Set<string>();
  let score = 0;
  const add = (points: number, reason: string) => {
    score += addUnique(reasons, seen, points, reason);
  };

  if (BIDI_CONTROL_PATTERN.test(text)) {
    add(6, "Contains bidirectional control characters that can visually reorder text.");
  }

  const candidates = extractCandidates(text);
  const assessments = candidates.map(assessUrl);
  if (assessments.length > 0) {
    const highest = assessments.reduce((best, current) =>
      current.score > best.score ? current : best,
    );
    score += highest.score;
    assessments.forEach((assessment) => {
      assessment.reasons.forEach((reason) => addUnique(reasons, seen, 0, reason));
    });

    const roots = new Set(
      assessments.map((assessment) => assessment.root).filter((root): root is string => Boolean(root)),
    );
    if (roots.size > 1) {
      add(2, `Contains links to multiple domains: ${[...roots].slice(0, 4).join(", ")}.`);
    }
  }

  const prose = candidates.reduce(
    (message, candidate) => message.split(candidate).join(" "),
    text,
  );
  const lower = prose.toLowerCase();
  for (const group of MESSAGE_GROUPS) {
    const hits = group.words.filter(
      (word) => containsTerm(lower, word) && !isNegatedAdvice(lower, word),
    );
    if (hits.length > 0) {
      add(group.points, `${group.label}: ${hits.slice(0, 3).join(", ")}.`);
    }
  }

  if (/\b(?:scan|open)\s+(?:the\s+)?qr\b/i.test(prose)) {
    add(1, "Asks the reader to use a QR code, which can conceal the destination.");
  }
  if (/\bhxxps?:\/\/|\[[.]\]/i.test(text)) {
    add(2, "Uses a deliberately obscured or defanged web address.");
  }
  if ((prose.match(/!/g) ?? []).length >= 3 || /\b[A-Z]{8,}\b/.test(prose)) {
    add(1, "Uses excessive punctuation or capital letters to create pressure.");
  }

  const level: RiskLevel =
    score >= HIGH_RISK_SCORE ? "high" : score >= MEDIUM_RISK_SCORE ? "medium" : "low";
  if (reasons.length === 0) {
    reasons.push("No common warning signs found. This does not guarantee it is safe.");
  }

  return { score, level, reasons };
}
