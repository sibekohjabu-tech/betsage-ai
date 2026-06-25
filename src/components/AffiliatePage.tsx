import { useState } from "react";
import { G } from "@/lib/theme";
import { AFFILIATES } from "@/lib/data";
import { Chip, Card, StatBox } from "@/components/ui-primitives";

export function AffiliatePage() {
  const [copied, setCopied] = useState(false);
  const link = "https://edgeai.bet/ref/SHARP2026";
  const mrr = AFFILIATES.filter((r) => r.status === "active").reduce((a, r) => a + r.earned, 0);

  function copy() {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ padding: "28px 24px", maxWidth: 960 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(0,255,136,.07)", border: "1px solid rgba(0,255,136,.18)", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: G.green, marginBottom: 16 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: G.green, animation: "pulse 2s infinite" }} />
        🤝 AFFILIATE PROGRAM
      </div>
      <div style={{ fontSize: 30, fontWeight: 900, marginBottom: 6 }}>Earn While They Win</div>
      <div style={{ color: G.dim, fontSize: 14, marginBottom: 24 }}>20% recurring commission — every month, for life</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
            {[{ label: "Monthly Recurring", value: `$${mrr.toFixed(2)}`, color: G.green }, { label: "Active Referrals", value: String(AFFILIATES.filter((r) => r.status === "active").length), color: G.accent }, { label: "All Time Earned", value: "$426", color: G.gold }, { label: "Next Payout", value: "Jun 1", color: G.text }].map((s, i) => (
              <StatBox key={i} label={s.label} value={s.value} color={s.color} />
            ))}
          </div>
          <Card>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Your Referral Link</div>
            <div onClick={copy} style={{ background: "#070E1A", border: `1px solid ${G.border}`, borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", marginBottom: 12 }}>
              <span style={{ fontFamily: "monospace", fontSize: 13, color: G.accent }}>{link}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: copied ? G.green : G.muted }}>{copied ? "✓ COPIED!" : "COPY"}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <a href={`https://wa.me/?text=I've been using EdgeAI — 68% win rate AI picks. Try it: ${link}`} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: "none", background: G.wa, color: "#fff", fontFamily: "inherit", fontWeight: 700, fontSize: 13, padding: "10px 16px", borderRadius: 8, textAlign: "center" }}>💬 WhatsApp</a>
              <a href={`https://twitter.com/intent/tweet?text=EdgeAI: 68% win rate AI picks. Try it: ${link}`} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: "none", background: "linear-gradient(135deg,#1DA1F2,#0d8ecf)", color: "#fff", fontFamily: "inherit", fontWeight: 700, fontSize: 13, padding: "10px 16px", borderRadius: 8, textAlign: "center" }}>🐦 X / Twitter</a>
            </div>
          </Card>
        </div>
        <Card>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Commission Structure</div>
          {[{ plan: "Starter $29", comm: "$5.80/mo" }, { plan: "Pro $99", comm: "$19.80/mo", hot: true }, { plan: "Elite $199", comm: "$39.80/mo" }].map((t, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 2 ? `1px solid ${G.border}` : "none" }}>
              <span style={{ fontWeight: 600 }}>{t.plan}</span>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: t.hot ? G.green : G.accent }}>{t.comm}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, background: "rgba(0,255,136,.05)", border: "1px solid rgba(0,255,136,.15)", borderRadius: 10, padding: 14, fontSize: 13, color: G.dim }}>💡 50 Pro referrals = <strong style={{ color: G.green }}>$990/month</strong> passive income</div>
          <div style={{ marginTop: 16, fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Your Referrals</div>
          {AFFILIATES.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < AFFILIATES.length - 1 ? `1px solid ${G.border}` : "none" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: G.dim }}>{r.plan}</div>
              </div>
              <Chip color={r.status === "active" ? G.green : G.red} bg={r.status === "active" ? "rgba(0,255,136,.1)" : "rgba(255,69,96,.1)"}>{r.status === "active" ? `+$${r.earned}/mo` : "Churned"}</Chip>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
