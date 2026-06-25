// ── COLOR TOKENS ─────────────────────────────────────────────────────────────
export const G = {
  bg: "#05080F",
  card: "#0B1422",
  card2: "#0F1B2E",
  border: "#182840",
  accent: "#00E5FF",
  green: "#00FF88",
  gold: "#FFD166",
  red: "#FF4560",
  purple: "#C084FC",
  orange: "#FB923C",
  muted: "#2A4060",
  text: "#D8E8F8",
  dim: "#5A7A9A",
  grad: "linear-gradient(135deg,#00E5FF,#00FF88)",
  gradGold: "linear-gradient(135deg,#FFD166,#FB923C)",
  gradGreen: "linear-gradient(135deg,#00FF88,#00CC6A)",
  wa: "linear-gradient(135deg,#25D366,#128C7E)",
};

export const TZ = "UTC+2";

export function getToday() {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getWCDays() {
  const wcStart = new Date("2026-06-11T19:00:00Z");
  const now = new Date();
  return Math.max(0, Math.ceil((wcStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}
