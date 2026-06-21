import { G } from "@/lib/theme";
import { TODAY, TZ, WC_DAYS, SOCCER_PICKS, TRACKER_DATA } from "@/lib/data";
import { Dot, Chip, Card, Card2, StatBox, PBar } from "@/components/ui-primitives";
interface DashPageProps { user: { name?: string; email?: string; trial?: boolean; plan?: { name: string } } | null; onUpgrade: () => void; }
export function DashPage({ user, onUpgrade }: DashPageProps) {
  const won = TRACKER_DATA.filter((b) => b.result === "won").length;
  const settled = TRACKER_DATA.filter((b) => b.result !== "pending").length;
  const pnl = TRACKER_DATA.reduce((a, b) => a + (b.pnl || 0), 0);
  return (<div style={{ padding: "28px 24px", maxWidth: 1060 }}>
    {user?.trial && <div style={{ background: "rgba(0,255,136,.06)", border: "1px solid rgba(0,255,136,.2)", borderRadius: 14, padding: "14px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}><div><div style={{ fontWeight: 800, color: G.green, marginBottom: 4 }}>🎁 Your 7-Day Free Trial is Active!</div><div style={{ fontSize: 13, color: G.dim }}>Full access · No charge for 7 days</div></div><Chip color={G.green} bg="rgba(0,255,136,.1)">✓ TRIAL</Chip></div>}
    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(0,229,255,.07)", border: "1px solid rgba(0,229,255,.18)", borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: G.accent, marginBottom: 16 }}><Dot c={G.green} pulse />{TODAY} · {TZ}</div>
    <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>Welcome{user?.name ? `, ${user.name}` : ""} <span style={{ color: G.accent }}>⚡</span></div>
    <div style={{ color: G.dim, fontSize: 14, marginBottom: 24 }}>🏆 World Cup in <strong style={{ color: G.accent }}>{WC_DAYS} days</strong></div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 26 }}>
      <StatBox label="Total P&L" value={`+${pnl.toFixed(2)}u`} color={G.green} sub="This week" />
      <StatBox label="Win Rate" value={`${Math.round((won / settled) * 100)}%`} color={G.accent} sub={`${won}/${settled} settled`} />
      <StatBox label="Active Picks" value="6" color={G.gold} sub="Today" />
      <StatBox label="WC Countdown" value={`${WC_DAYS}d 🏆`} color={G.purple} sub="Jun 11" />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
      <div><div style={{ fontWeight: 800, fontSize: 17, marginBottom: 14 }}>⭐ Top Picks</div>{SOCCER_PICKS.slice(0, 4).map((p) => (<div key={p.id} style={{ background: G.card2, border: `1px solid ${G.border}`, borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><div><div style={{ fontSize: 11, color: G.dim, marginBottom: 3 }}>{p.league}</div><div style={{ fontWeight: 700, fontSize: 14 }}>{p.pick}</div></div><div style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: G.gold }}>{p.odds}</div></div>))}</div>
      <div><div style={{ fontWeight: 800, fontSize: 17, marginBottom: 14 }}>📈 Recent P&L</div><Card>{TRACKER_DATA.slice(0, 6).map((b, i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 5 ? `1px solid ${G.border}` : "none" }}><div><div style={{ fontSize: 13, fontWeight: 600 }}>{b.pick}</div></div><div style={{ fontFamily: "monospace", fontWeight: 700, color: b.pnl === null ? G.dim : b.pnl >= 0 ? G.green : G.red, fontSize: 14 }}>{b.pnl === null ? "⏳" : `${b.pnl >= 0 ? "+" : ""}${b.pnl?.toFixed(2)}u`}</div></div>))}</Card></div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>{[{sport:"⚽",label:"Soccer Hub",picks:6,prob:"82%"},{sport:"🏀",label:"Basketball",picks:2,prob:"79%"},{sport:"🎾",label:"Tennis",picks:2,prob:"78%"},{sport:"⚾",label:"MLB",picks:2,prob:"77%"},{sport:"🏆",label:"World Cup",picks:10,prob:"80%"}].map((s) => (<Card2 key={s.label} style={{ textAlign: "center", cursor: "pointer" }}><div style={{ fontSize: 24, marginBottom: 6 }}>{s.sport}</div><div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{s.label}</div><div style={{ fontFamily: "monospace", color: G.green, fontWeight: 700, fontSize: 18 }}>{s.picks}</div></Card2>))}</div>
  </div>);
}