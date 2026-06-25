import { useState } from "react";
import { G } from "@/lib/theme";
import { TODAY, TZ, WC_DAYS, SOCCER_PICKS, SUBTABS } from "@/lib/data";
import { Dot, Chip, Card, PBar } from "@/components/ui-primitives";

const FIELD_MAP: Record<string, keyof typeof SOCCER_PICKS[0]> = {
  over25: "pick",
  corners: "corners",
  handicap: "handicap",
  bookings: "bookings",
  draw: "draw",
  btts: "btts",
};

export function SoccerPage() {
  const [sub, setSub] = useState("over25");
  const active = SUBTABS.find((t) => t.key === sub)!;
  const field = FIELD_MAP[sub];
  const picks = SOCCER_PICKS.filter((p) => p[field]);

  return (
    <div style={{ padding: "28px 24px", maxWidth: 1060 }}>
      {/* Hero banner */}
      <div
        style={{
          background: "linear-gradient(135deg,#0A1C35,#081428)",
          border: "1px solid rgba(0,229,255,.2)",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 22,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <Dot c={G.accent} pulse />
            <span style={{ fontSize: 11, fontWeight: 700, color: G.accent, letterSpacing: 1 }}>
              FIFA WORLD CUP 2026 · {WC_DAYS} DAYS TO KICK-OFF
            </span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, marginBottom: 4 }}>⚽ Soccer Betting Hub</div>
          <div style={{ color: G.dim, fontSize: 13 }}>
            Real fixtures · {TODAY} · All times {TZ} · WC warm-ups + Copa Sud. + Brasileirao
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: G.accent, fontFamily: "monospace", lineHeight: 1 }}>{WC_DAYS}</div>
          <div style={{ fontSize: 11, color: G.dim, fontWeight: 700 }}>DAYS TO WC</div>
        </div>
      </div>

      {/* Fixtures today */}
      <Card style={{ marginBottom: 20, padding: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: G.dim, marginBottom: 12, letterSpacing: 1 }}>
          TODAY'S FIXTURES · {TODAY}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
          {SOCCER_PICKS.map((f) => (
            <div
              key={f.id}
              style={{
                background: G.bg,
                border: `1px solid ${G.border}`,
                borderRadius: 10,
                padding: "12px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 10, color: G.muted, marginBottom: 3 }}>{f.league}</div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>
                  {f.home} vs {f.away}
                </div>
              </div>
              <div style={{ fontFamily: "monospace", fontWeight: 700, color: G.gold, flexShrink: 0, marginLeft: 8 }}>
                {f.time}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Subtabs */}
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 18 }}>
        {SUBTABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setSub(t.key)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: `1px solid ${sub === t.key ? G.accent : G.border}`,
              background: sub === t.key ? G.accent : "transparent",
              color: sub === t.key ? "#000" : G.dim,
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {t.icon} {t.label}
            <span
              style={{
                background: sub === t.key ? "rgba(0,0,0,.2)" : "rgba(0,229,255,.1)",
                color: sub === t.key ? "#000" : G.accent,
                borderRadius: 4,
                padding: "1px 6px",
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              {picks.length}
            </span>
          </button>
        ))}
      </div>

      {/* Summary bar */}
      <div
        style={{
          background: "rgba(0,229,255,.04)",
          border: "1px solid rgba(0,229,255,.12)",
          borderRadius: 10,
          padding: "10px 16px",
          marginBottom: 18,
          display: "flex",
          gap: 20,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 20 }}>{active.icon}</span>
        <div>
          <div style={{ fontWeight: 800, color: G.accent, fontSize: 14 }}>{active.label} Picks</div>
          <div style={{ fontSize: 12, color: G.dim }}>
            {picks.length} picks · Avg {Math.round(picks.reduce((a, p) => a + p.prob, 0) / picks.length)}% prob
          </div>
        </div>
        {sub === "over25" && (
          <div style={{ marginLeft: "auto", fontSize: 12, color: G.green, fontWeight: 700 }}>
            ✓ Always included in every AI accumulator
          </div>
        )}
      </div>

      {/* Pick cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: 16 }}>
        {picks.map((p, i) => {
          const val = p[field] as string;
          return (
            <div
              key={p.id}
              className="fu"
              style={{
                background: G.card2,
                border: `1px solid ${G.border}`,
                borderLeft: `3px solid ${G.accent}`,
                borderRadius: 14,
                padding: 18,
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                    <Chip color={p.tag === "SHARP" ? G.green : G.accent} bg={p.tag === "SHARP" ? "rgba(0,255,136,.1)" : "rgba(0,229,255,.1)"}>
                      {p.tag}
                    </Chip>
                    <span style={{ fontSize: 11, color: G.dim }}>{p.league}</span>
                    <span style={{ fontSize: 11, color: G.muted, background: G.border, padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>
                      {p.time} {TZ}
                    </span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>
                    {p.home} <span style={{ color: G.muted, fontWeight: 400, fontSize: 13 }}>vs</span> {p.away}
                  </div>
                </div>
                <div style={{ textAlign: "right", marginLeft: 12, flexShrink: 0 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, color: G.accent }}>{p.odds}</div>
                  <div style={{ fontSize: 11, color: G.dim }}>{p.units}u</div>
                </div>
              </div>
              <div style={{ background: G.bg, borderRadius: 8, padding: "10px 12px", marginBottom: 10, border: `1px solid ${G.border}` }}>
                <div style={{ fontSize: 10, color: G.muted, fontWeight: 700, marginBottom: 4 }}>PICK</div>
                <div style={{ fontFamily: "monospace", fontWeight: 700, color: G.accent, fontSize: 13 }}>{val}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: G.dim }}>Win Probability</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: "rgba(0,255,136,.1)", color: G.green }}>
                    {p.ev} EV
                  </span>
                  <span style={{ fontFamily: "monospace", fontWeight: 700, color: p.prob >= 80 ? G.green : G.accent }}>{p.prob}%</span>
                </div>
              </div>
              <PBar v={p.prob} c={G.accent} />
              <div style={{ marginTop: 12 }}>
                <Chip color={p.status === "won" ? G.green : p.status === "lost" ? G.red : G.gold} bg={p.status === "won" ? "rgba(0,255,136,.1)" : p.status === "lost" ? "rgba(255,69,96,.1)" : "rgba(255,209,102,.1)"}>
                  {p.status === "won" ? "✓ Won" : p.status === "lost" ? "✗ Lost" : "⏳ Pending"}
                </Chip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
