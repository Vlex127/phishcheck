import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Phishing quiz",
  description:
    "Test your phishing awareness with 10 realistic SMS, WhatsApp, email, social media, and website scenarios. Get instant feedback and a full answer review.",
  alternates: {
    canonical: "/quiz",
  },
};

export default function QuizLayout({ children }: { children: ReactNode }) {
  return children;
}
