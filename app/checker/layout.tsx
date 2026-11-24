import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Link checker",
  description:
    "Paste a suspicious link or message and get a quick phishing risk rating with plain-language reasons. Checks run entirely in your browser.",
  alternates: {
    canonical: "/checker",
  },
};

export default function CheckerLayout({ children }: { children: ReactNode }) {
  return children;
}
