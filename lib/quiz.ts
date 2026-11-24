export type QuizItem = {
  id: number;
  channel: "SMS" | "WhatsApp" | "Email" | "Social media" | "Website";
  message: string;
  isPhishing: boolean;
  explanation: string;
};

export const quiz: QuizItem[] = [
  {
    id: 1,
    channel: "SMS",
    message:
      "GTBank Alert: Your account has been RESTRICTED. Verify your BVN within 24 hours to avoid closure: http://gtbank-verify-ng.top/login",
    isPhishing: true,
    explanation:
      "Banks don't restrict accounts by SMS link. The domain is not gtbank.com, it uses a .top ending, and the message pushes you with a 24-hour threat.",
  },
  {
    id: 2,
    channel: "WhatsApp",
    message:
      "Congratulations! You've been selected for the 2026 Federal Government Scholarship (\u20a6500,000). Register here: bit.ly/fgn-scholar26",
    isPhishing: true,
    explanation:
      "Unexpected prize or scholarship offers sent to everyone are a classic lure. The shortened link hides where it really goes.",
  },
  {
    id: 3,
    channel: "SMS",
    message:
      "Debit alert: NGN 5,000.00 on your account at 14:02. If you did not authorise this, call the number on the back of your card.",
    isPhishing: false,
    explanation:
      "This is a normal transaction alert. It has no link and tells you to use the number on your card, not one in the message.",
  },
  {
    id: 4,
    channel: "Email",
    message:
      "From: support@paypa1-secure.com. Your account is suspended. Click here immediately to restore access.",
    isPhishing: true,
    explanation:
      "'paypa1' uses the number 1 instead of the letter l. Lookalike sender domains and 'act immediately' wording are red flags.",
  },
  {
    id: 5,
    channel: "WhatsApp",
    message:
      "Hi, I'm from MTN. We are giving free 10GB. Send me the 6-digit code you just received to claim.",
    isPhishing: true,
    explanation:
      "Anyone asking for a code sent to your phone is trying to take over your account. Never share OTPs.",
  },
  {
    id: 6,
    channel: "Email",
    message:
      "Your Paystack receipt for the \u20a63,000 payment you made yesterday is attached. No action is needed.",
    isPhishing: false,
    explanation:
      "If you did make a payment and the sender address is the official one, a receipt with no request for details is normal. Always check the sender address first.",
  },
  {
    id: 7,
    channel: "Social media",
    message:
      "URGENT: Earn \u20a650,000 daily from home! DM 'WORK' now. Only 5 slots left. Registration fee \u20a65,000.",
    isPhishing: true,
    explanation:
      "Job offers that ask you to pay first, promise huge pay for little work, and create false urgency are advance-fee scams.",
  },
  {
    id: 8,
    channel: "Website",
    message:
      "You open https://www.lasu.edu.ng and the padlock shows HTTPS with the correct address.",
    isPhishing: false,
    explanation:
      "The address matches the real school domain (lasu.edu.ng). Always read the full domain, not just look for the padlock.",
  },
  {
    id: 9,
    channel: "SMS",
    message:
      "Dear customer, your NIN-SIM linkage expires today. Update now: http://192.168.44.12/nin-update",
    isPhishing: true,
    explanation:
      "A link made of numbers (an IP address) instead of a proper domain is a strong warning sign. Government services don't work like this.",
  },
  {
    id: 10,
    channel: "WhatsApp",
    message:
      "Hey, it's Tunde from class. Please check the group's attendance sheet we discussed: docs.google.com/spreadsheets/... (link from a saved contact you were just chatting with)",
    isPhishing: false,
    explanation:
      "It comes from a known contact in an expected conversation, and the link goes to the real docs.google.com domain. Even then, confirm if anything feels odd.",
  },
];

export function scoreQuiz(answers: Record<number, boolean>) {
  const correct = quiz.filter((q) => answers[q.id] === q.isPhishing).length;
  const pct = Math.round((correct / quiz.length) * 100);
  const level = pct >= 80 ? "High awareness" : pct >= 50 ? "Moderate awareness" : "Low awareness";
  return { correct, total: quiz.length, pct, level };
}
