import { useState } from "react";
import { G } from "@/lib/theme";
import type { Plan } from "@/lib/data";
import { Chip } from "@/components/ui-primitives";

interface CheckoutModalProps {
  plan: Plan;
  user: { name?: string; email?: string } | null;
  onClose: () => void;
  onSuccess: (user: Record<string, unknown>) => void;
}

export function CheckoutModal({ plan, user, onClose, onSuccess }: CheckoutModalProps) {
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7);
  const ted = trialEnd.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const inp: React.CSSProperties = {
    width: "100%",
    background: "#070E1A",
    border: `1px solid ${G.border}`,
    borderRadius: 9,
    padding: "12px 14px",
    color: G.text,
    fontFamily: "monospace",
    fontSize: 14,
    outline: "none",
  };

  function fc(v: string) {
    return v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  }
  function fe(v: string) {
    return v.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1/$2").slice(0, 5);
  }

  async function pay() {
    if (!card || card.replace(/\s/g, "").length < 16) { setMsg("Enter a valid 16-digit card number."); return; }
    if (!exp || exp.length < 5) { setMsg("Enter expiry MM/YY."); return; }
    if (!cvc || cvc.length < 3) { setMsg("Enter your CVC."); return; }
    setLoading(true); setMsg(null);
    await new Promise((r) => setTimeout(r, 2400));
    const u = { ...user, plan, trial: true, subscribed: true };
    localStorage.setItem("ea_user", JSON.stringify(u));
    onSuccess(u);
  }

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", zIndex: 600, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="pop" style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 20, width: "100%", maxWidth: 420, padding: 32, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", color: G.dim, cursor: "pointer", fontSize: 18 }}>✕</button>
        <Chip color={G.green} bg="rgba(0,255,136,.08)">🎁 7-DAY FREE TRIAL</Chip>
        <div style={{ fontSize: 22, fontWeight: 900, margin: "12px 0 4px" }}>
          {plan.name} — <span style={{ color: G.accent, fontFamily: "monospace" }}>${plan.price}/mo</span>
        </div>
        <div style={{ fontSize: 13, color: G.dim, marginBottom: 18 }}>
          Signing up as <strong style={{ color: G.text }}>{user?.email}</strong>
        </div>
        <div style={{ background: "rgba(0,255,136,.05)", border: "1px solid rgba(0,255,136,.15)", borderRadius: 12, padding: "14px 18px", marginBottom: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
            {([ ["Today", "FREE ✓", G.green], [`Day 7`, ted.split(" ").slice(0, 2).join(" "), G.gold], ["Day 8+", `$${plan.price}/mo`, G.text] ] as const).map(([d, v, c]) => (
              <div key={d}>
                <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 14, color: c }}>{v}</div>
                <div style={{ fontSize: 11, color: G.dim, marginTop: 3 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        {msg && (
          <div style={{ padding: "10px 14px", background: "rgba(255,69,96,.1)", border: "1px solid rgba(255,69,96,.2)", borderRadius: 8, fontSize: 13, color: G.red, marginBottom: 12 }}>{msg}</div>
        )}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: G.dim, fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>CARD NUMBER</div>
          <input style={inp} placeholder="1234 5678 9012 3456" value={card} onChange={(e) => setCard(fc(e.target.value))} maxLength={19} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: G.dim, fontWeight: 700, marginBottom: 6 }}>EXPIRY</div>
            <input style={inp} placeholder="MM/YY" value={exp} onChange={(e) => setExp(fe(e.target.value))} maxLength={5} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: G.dim, fontWeight: 700, marginBottom: 6 }}>CVC</div>
            <input style={inp} placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} maxLength={4} />
          </div>
        </div>
        <div style={{ fontSize: 12, color: G.dim, marginBottom: 16 }}>
          🔒 Secured by <strong style={{ color: G.text }}>Stripe</strong> · 256-bit SSL · PCI compliant
        </div>
        <button onClick={pay} disabled={loading} style={{ width: "100%", padding: 15, background: G.gradGreen, color: "#000", fontFamily: "inherit", fontWeight: 700, borderRadius: 9, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.65 : 1, fontSize: 15 }}>
          {loading ? <span>⟳ Activating trial...</span> : "Start Free Trial — No Charge Today 🚀"}
        </button>
        <div style={{ textAlign: "center", fontSize: 12, color: G.muted, marginTop: 10 }}>
          Cancel anytime · Renews ${plan.price}/mo after {ted}
        </div>
      </div>
    </div>
  );
}
