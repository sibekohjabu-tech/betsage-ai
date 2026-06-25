import { G } from "@/lib/theme";
import { Card } from "@/components/ui-primitives";

export function WAPage() {
  const groups = [
    { name: "EdgeAI · Starter Picks", members: 312, tier: "Starter", open: true },
    { name: "EdgeAI · Pro VIP", members: 187, tier: "Pro", open: true },
    { name: "EdgeAI · Elite Inner Circle", members: 43, tier: "Elite", open: false },
  ];

  return (
    <div style={{ padding: "28px 24px", maxWidth: 900 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(37,211,102,.07)", border: "1px solid rgba(37,211,102,.18)", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: "#25D366", marginBottom: 16 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#25D366", animation: "pulse 2s infinite" }} />
        💬 WHATSAPP VIP GROUPS · LIVE
      </div>
      <div style={{ fontSize: 30, fontWeight: 900, marginBottom: 6 }}>WhatsApp VIP Groups</div>
      <div style={{ color: G.dim, fontSize: 14, marginBottom: 24 }}>Picks delivered instantly to your WhatsApp — the moment AI finds value</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 28 }}>
        {groups.map((g, i) => (
          <Card key={i} style={{ borderColor: i === 1 ? "rgba(37,211,102,.2)" : G.border }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <span style={{ fontSize: 32 }}>💬</span>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, color: g.open ? "#25D366" : G.red, background: g.open ? "rgba(37,211,102,.1)" : "rgba(255,69,96,.1)" }}>{g.open ? "🟢 Open" : "🔴 Invite Only"}</span>
            </div>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{g.name}</div>
            <div style={{ fontSize: 13, color: G.dim, marginBottom: 14 }}>{g.tier} subscribers only</div>
            <div style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 700, color: "#25D366" }}>{g.members}</div>
            <div style={{ fontSize: 11, color: G.dim, marginBottom: 16 }}>members</div>
            <button style={{ width: "100%", background: G.wa, color: "#fff", fontFamily: "inherit", fontWeight: 700, fontSize: 14, padding: "12px", borderRadius: 8, border: "none", cursor: "pointer" }}>💬 Join Group</button>
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>How Picks Are Delivered</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[["01", "AI Detects Value", "Scans odds 24/7 for EV+ picks"], ["02", "Instant WA Alert", "Pick, odds, units & analysis sent"], ["03", "Line Watch", "Follow-up alert if line moves"], ["04", "Result Update", "Win/loss + unit P&L posted"]].map(([s, t, d]) => (
            <div key={s} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13, color: "#25D366", marginBottom: 8 }}>{s}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{t}</div>
              <div style={{ fontSize: 13, color: G.dim, lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
