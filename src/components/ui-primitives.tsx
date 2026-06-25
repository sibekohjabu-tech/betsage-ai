import type { ReactNode, CSSProperties } from "react";
import { G } from "@/lib/theme";

export function Dot({ c, pulse }: { c?: string; pulse?: boolean }) {
  return (
    <span style={{ width: 7, height: 7, borderRadius: "50%", background: c || G.green, display: "inline-block", flexShrink: 0, animation: pulse ? "pulse 2s infinite" : undefined }} />
  );
}

export function PBar({ v, c }: { v: number; c?: string }) {
  return (
    <div style={{ height: 5, borderRadius: 3, background: G.border, overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 3, width: `${v}%`, background: c || G.accent, transition: "width .9s ease" }} />
    </div>
  );
}

export function Chip({ children, color, bg }: { children: ReactNode; color?: string; bg?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.4, color: color || G.accent, background: bg || "rgba(0,229,255,.1)" }}>
      {children}
    </span>
  );
}

export function SBtn({ active, col, onClick, children, sm }: { active?: boolean; col?: string; onClick?: () => void; children: ReactNode; sm?: boolean }) {
  return (
    <button onClick={onClick} style={{ padding: sm ? "6px 14px" : "8px 18px", borderRadius: 8, border: `1px solid ${active ? col || G.accent : G.border}`, background: active ? col || G.accent : "transparent", color: active ? "#000" : G.dim, fontFamily: "inherit", fontSize: sm ? 12 : 13, fontWeight: 700, cursor: "pointer", transition: "all .15s" }}>
      {children}
    </button>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 16, padding: 22, ...style }}>
      {children}
    </div>
  );
}

export function Card2({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ background: G.card2, border: `1px solid ${G.border}`, borderRadius: 12, padding: "16px 18px", ...style }}>
      {children}
    </div>
  );
}

export function StatBox({ label, value, color, sub }: { label: string; value: string; color?: string; sub?: string }) {
  return (
    <div style={{ background: G.card2, border: `1px solid ${G.border}`, borderRadius: 12, padding: "16px 18px" }}>
      <div style={{ fontSize: 11, color: G.muted, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: color || G.accent, fontFamily: "'DM Mono', monospace" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: G.dim, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = "text", onKeyDown, style: extra }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; onKeyDown?: () => void; style?: CSSProperties }) {
  const base: CSSProperties = { width: "100%", background: "#070E1A", border: `1px solid ${G.border}`, borderRadius: 9, padding: "12px 14px", color: G.text, fontFamily: "inherit", fontSize: 14, outline: "none", marginBottom: 12, ...extra };
  return <input style={base} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown} />;
}

export function PrimaryButton({ onClick, children, gradient = "grad", loading, disabled, style: extra }: { onClick?: () => void; children: ReactNode; gradient?: "grad" | "gradGreen" | "gradGold"; loading?: boolean; disabled?: boolean; style?: CSSProperties }) {
  return (
    <button onClick={onClick} disabled={disabled || loading} style={{ width: "100%", padding: 14, background: G[gradient], color: "#000", fontFamily: "inherit", fontWeight: 700, borderRadius: 9, border: "none", cursor: loading || disabled ? "not-allowed" : "pointer", opacity: loading || disabled ? 0.65 : 1, fontSize: 14, ...extra }}>
      {loading ? "Loading..." : children}
    </button>
  );
}
