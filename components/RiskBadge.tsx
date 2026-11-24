import type { RiskLevel } from "@/lib/checklink";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  ShieldAlertIcon,
} from "@/components/icons";

const styles: Record<RiskLevel, string> = {
  low: "border-safe/50 bg-safe/10 text-safe",
  medium: "border-caution/50 bg-caution/10 text-caution",
  high: "border-danger/50 bg-danger/10 text-danger",
};

const labels: Record<RiskLevel, string> = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
};

export function RiskBadge({ level }: { level: RiskLevel }) {
  const Icon =
    level === "low"
      ? CheckCircleIcon
      : level === "medium"
        ? AlertTriangleIcon
        : ShieldAlertIcon;

  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${styles[level]}`}
    >
      <Icon className="size-3.5 shrink-0" />
      {labels[level]}
    </span>
  );
}
