import assert from "node:assert/strict";
import { checkLink } from "../lib/checklink.ts";

const cases = [
  {
    name: "official LASU site",
    input: "https://www.lasu.edu.ng",
    level: "low",
  },
  {
    name: "official login path",
    input: "https://www.lasu.edu.ng/portal/login",
    level: "low",
  },
  {
    name: "official PayPal login",
    input: "https://www.paypal.com/signin",
    level: "low",
  },
  {
    name: "unrelated word containing access",
    input: "https://accessibility.com/resources",
    level: "low",
  },
  {
    name: "shared-host project URL",
    input: "https://phishcheck-tau.vercel.app",
    level: "low",
  },
  {
    name: "fake bank login",
    input: "http://gtbank-verify-ng.top/login",
    level: "high",
    reason: "real domain is",
  },
  {
    name: "shortened link",
    input: "bit.ly/fgn-scholar26",
    level: "medium",
    reason: "shortened link",
  },
  {
    name: "private numeric address",
    input: "http://192.168.44.12/nin-update",
    level: "high",
    reason: "numeric IP address",
  },
  {
    name: "private numeric address without scheme",
    input: "192.168.44.12/nin-update",
    level: "high",
    reason: "private-network address",
  },
  {
    name: "digit-for-letter brand",
    input: "paypa1-secure.com",
    level: "high",
    reason: "paypal",
  },
  {
    name: "official domain embedded as a subdomain",
    input: "https://accessbankplc.com.secure-login.top",
    level: "high",
    reason: "real domain is secure-login.top",
  },
  {
    name: "trusted name hidden in URL user information",
    input: "https://paypal.com@account-check.example/login",
    level: "high",
    reason: "hide the real destination",
  },
  {
    name: "pressure message",
    input: "URGENT: verify your BVN within 24 hours or your account will be suspended",
    level: "high",
    reason: "sensitive information",
  },
  {
    name: "plain text",
    input: "not a link",
    level: "low",
  },
  {
    name: "dangerous scheme",
    input: "javascript:alert(document.cookie)",
    level: "high",
    reason: "dangerous link scheme",
  },
  {
    name: "risky executable download",
    input: "https://dhl-track-support.top/update.apk",
    level: "high",
    reason: ".apk download",
  },
  {
    name: "external redirect",
    input:
      "https://portal.example.com/login?redirect=https%3A%2F%2Faccount-check.top%2Fverify",
    level: "high",
    reason: "redirect to a different site",
  },
  {
    name: "multiple domains",
    input:
      "Compare https://www.lasu.edu.ng with http://gtbank-verify-ng.top/login",
    level: "high",
    reason: "multiple domains",
  },
  {
    name: "bidirectional control character",
    input: "https://pay\u202Epal.com",
    level: "high",
    reason: "bidirectional control characters",
  },
  {
    name: "dangerous link after many benign links",
    input:
      "https://one.example.com https://two.example.com https://three.example.com https://four.example.com https://five.example.com https://six.example.com https://seven.example.com https://eight.example.com javascript:alert(1)",
    level: "high",
    reason: "dangerous link scheme",
  },
  {
    name: "bare URL user information",
    input: "paypal.com@evil.example/login",
    level: "high",
    reason: "hide the real destination",
  },
  {
    name: "email address in a query",
    input: "https://example.com/?email=user@example.org",
    level: "low",
  },
  {
    name: "official FCMB domain",
    input: "https://fcmb.com",
    level: "low",
  },
  {
    name: "private IPv6",
    input: "https://[::1]/login",
    level: "high",
    reason: "private-network address",
  },
  {
    name: "public IPv6",
    input: "https://[2001:4860:4860::8888]/",
    level: "medium",
    reason: "numeric IP address",
  },
  {
    name: "localhost subdomain",
    input: "https://foo.localhost/login",
    level: "medium",
    reason: "private-network address",
  },
  {
    name: "uppercase redirect key",
    input: "https://example.com/?REDIRECT=https%3A%2F%2Fevil.example",
    level: "high",
    reason: "redirect to a different site",
  },
  {
    name: "duplicate redirect parameter",
    input:
      "https://example.com/?redirect=%2Fhome&redirect=https%3A%2F%2Fevil.example",
    level: "high",
    reason: "redirect to a different site",
  },
  {
    name: "dangerous nested redirect",
    input: "https://example.com/?next=javascript%3Aalert(1)",
    level: "high",
    reason: "dangerous executable scheme",
  },
  {
    name: "concatenated brand and security word",
    input: "https://paypalsecurity.com/login",
    level: "high",
    reason: "paypal",
  },
  {
    name: "generic access word without banking context",
    input: "https://access-control.com/docs",
    level: "low",
  },
  {
    name: "pin substring in ordinary prose",
    input: "In my opinion this message is ordinary.",
    level: "low",
  },
  {
    name: "pin substring in a domain",
    input: "https://pinterest.com",
    level: "low",
  },
  {
    name: "negated OTP safety advice",
    input: "Never share your OTP with anyone.",
    level: "low",
  },
  {
    name: "single sensitive path on ordinary site",
    input: "https://example.com/password",
    level: "low",
  },
  {
    name: "legitimate zero-width joiner in prose",
    input: "Family emoji: 👨‍👩‍👧‍👦",
    level: "low",
  },
  {
    name: "punycode without extra hyphen penalty",
    input: "https://xn--bcher-kva.example",
    level: "medium",
    reason: "punycode",
  },
  {
    name: "FTP scheme",
    input: "ftp://files.example.com/archive.zip",
    level: "medium",
    reason: "uncommon link scheme",
  },
  {
    name: "encoded risky download",
    input: "https://example.com/download%2Eapk",
    level: "medium",
    reason: ".apk download",
  },
  {
    name: "ordinary path ending in dot com",
    input: "https://example.org/files/example.com",
    level: "low",
  },
] as const;

for (const testCase of cases) {
  const result = checkLink(testCase.input);
  assert.equal(
    result.level,
    testCase.level,
    `${testCase.name}: expected ${testCase.level}, got ${result.level} (${result.score})`,
  );

  if ("reason" in testCase) {
    assert.ok(
      result.reasons.some((reason) =>
        reason.toLowerCase().includes(testCase.reason.toLowerCase()),
      ),
      `${testCase.name}: missing reason containing "${testCase.reason}"`,
    );
  }
}

console.log(`Checker smoke tests passed: ${cases.length}`);
