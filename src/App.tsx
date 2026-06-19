import { useState } from "react";
import { G } from "@/lib/theme";
import { TODAY, TZ, WC_DAYS, PLANS } from "@/lib/data";
import { Dot, Chip } from "@/components/ui-primitives";
import { Ticker } from "@/components/Ticker";
import { AuthModal } from "@/components/AuthModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { DashPage } from "@/components/DashPage";
import { SoccerPage } from "@/components/SoccerPage";
import { WCPage } from "@/components/WCPage";
import { AccaPage } from "@/components/AccaPage";
import { TrackerPage } from "@/components/TrackerPage";
import { AffiliatePage } from "@/components/AffiliatePage";
import { WAPage } from "@/components/WAPage";
import { PricingPage } from "@/components/PricingPage";
import { LiveFixtures } from "@/components/LiveFixtures";
const PAGES = [
  { key: "dashboard", ico: "⚡", label: "Dashboard" },
  { key: "live", ico: "🔴", label: "Live Fixtures", badge: "LIVE", bc: G.red },
  { key: "worldcup", ico: "🏆", label: "World Cup", badge: "HOT" },
  { key: "soccer", ico: "⚽", label: "Soccer Hub", badge: "FOCUS" },
  { key: "accumulator", ico: "🎰", label: "AI Accumulator" },
  { key: "tracker", ico: "💰", label: "Bet Tracker" },
  { key: "affiliate", ico: "🤝", label: "Affiliate" },
  { key: "whatsapp", ico: "💬", label: "WhatsApp" },
  { key: "pricing", ico: "💳", label: "Pricing" },
];
interface User { id: string; name: string; email: string; plan?: { name: string; price: number; id: string }; trial?: boolean; subscribed?: boolean; }
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState<User | null>(() => { try { const raw = localStorage.getItem("ea_user"); return raw ? JSON.parse(raw) : null; } catch { return null; } });
  const [authModal, setAuthModal] = useState<{ mode: "signin" | "signup" | "forgot"; plan?: (typeof PLANS)[number] } | null>(null);
  const [checkout, setCheckout] = useState<(typeof PLANS)[number] | null>(null);
  function afterAuth(u: User) { setUser(u); setAuthModal(null); if (!u.subscribed) setCheckout(PLANS[1]); }
  function afterCheckout(u: unknown) { setUser(u as User); setCheckout(null); setPage("dashboard"); }
  function signOut() { localStorage.removeItem("ea_user"); setUser(null); setPage("pricing"); }
  function startTrial(plan: (typeof PLANS)[number]) { if (!user) { setAuthModal({ mode: "signup", plan }); } else { setCheckout(plan); } }
  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Mono:wght@400;500;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      body{background:#05080F;color:#D8E8F8;font-family:'Outfit',sans-serif;}
      ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#05080F}::-webkit-scrollbar-thumb{background:#182840;border-radius:4px}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
      @keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
      .fu{animation:fadeUp .4s ease both}.pop{animation:popIn .3s ease both}
      @media(max-width:768px){.desktop-sidebar{display:none!important}.desktop-nav{display:none!important}.mobile-bottom-nav{display:flex!important}.main-content{grid-column:1/-1!important}}
      @media(min-width:769px){.mobile-bottom-nav{display:none!important}}
    `}</style>
    {authModal && <AuthModal mode={authModal.mode} plan={authModal.plan} onClose={() => setAuthModal(null)} onSuccess={afterAuth} />}
    {checkout && user && <CheckoutModal plan={checkout} user={user} onClose={() => setCheckout(null)} onSuccess={afterCheckout} />}
    <div className="desktop-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, backdropFilter: "blur(20px)", background: "rgba(5,8,15,.92)", borderBottom: `1px solid ${G.border}`, height: 58, display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 20px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("dashboard")}><div style={{ width: 30, height: 30, background: G.grad, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#000" }}>⚡</div><span style={{ fontWeight: 900, fontSize: 20, letterSpacing: "-.5px" }}>EDGE<span style={{ color: G.accent }}>AI</span></span>{user?.trial && <Chip color={G.green} bg="rgba(0,255,136,.08)">🎁 TRIAL</Chip>}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}><div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(0,229,255,.07)", border: "1px solid rgba(0,229,255,.18)", borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: G.accent }}><Dot c={G.green} pulse />{TODAY}</div><div style={{ background: "rgba(255,209,102,.08)", border: "1px solid rgba(255,209,102,.2)", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: G.gold, fontWeight: 700 }}>🏆 WC2026 · {WC_DAYS}d</div>{!user ? <><button onClick={() => setAuthModal({ mode: "signin" })} style={{ background: "transparent", border: `1px solid ${G.border}`, color: G.text, fontFamily: "inherit", fontWeight: 600, padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Sign In</button><button onClick={() => setAuthModal({ mode: "signup", plan: PLANS[1] })} style={{ background: G.grad, color: "#000", fontFamily: "inherit", fontWeight: 700, padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13 }}>Start Free Trial</button></> : <><span style={{ fontSize: 13, color: G.dim }}>👋 {user.name || user.email?.split("@")[0]}</span><button onClick={signOut} style={{ background: "transparent", border: `1px solid ${G.border}`, color: G.dim, fontFamily: "inherit", padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Sign Out</button></>}</div>
      </div>
    </div>
    <div style={{ paddingTop: 58 }}><Ticker /></div>
    <div style={{ display: "grid", gridTemplateColumns: "210px 1fr", minHeight: "calc(100vh - 90px)" }}>
      <div className="desktop-sidebar" style={{ background: G.card, borderRight: `1px solid ${G.border}`, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 3, position: "sticky", top: 90, height: "calc(100vh - 90px)", overflowY: "auto" }}>
        {PAGES.map((p) => (<button key={p.key} onClick={() => setPage(p.key)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: page === p.key ? "rgba(0,229,255,.07)" : "transparent", color: page === p.key ? G.accent : G.dim, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", textAlign: "left", border: "none", outline: "none" }}><span style={{ fontSize: 15, width: 22, textAlign: "center", flexShrink: 0 }}>{p.ico}</span>{p.label}{p.badge && <span style={{ marginLeft: "auto", background: `${G.gold}18`, color: G.gold, fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4 }}>{p.badge}</span>}</button>))}
        <div style={{ marginTop: "auto", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>{!user ? <button onClick={() => setAuthModal({ mode: "signup", plan: PLANS[1] })} style={{ width: "100%", padding: 11, background: G.gradGreen, color: "#000", fontFamily: "inherit", fontWeight: 700, borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13 }}>🎁 Start Free Trial</button> : <div style={{ background: "rgba(0,255,136,.06)", border: "1px solid rgba(0,255,136,.15)", borderRadius: 10, padding: "10px 12px" }}><div style={{ fontSize: 10, color: G.green, fontWeight: 700, marginBottom: 4 }}>TRIAL ACTIVE</div><div style={{ fontSize: 11, color: G.dim }}>7 days free · {user.plan?.name} plan</div></div>}<div style={{ background: "rgba(255,209,102,.05)", border: "1px solid rgba(255,209,102,.15)", borderRadius: 10, padding: "10px 12px" }}><div style={{ fontSize: 10, color: G.gold, fontWeight: 700, marginBottom: 3 }}>⚠️ DISCLAIMER</div><div style={{ fontSize: 10, color: G.dim }}>18+ · Entertainment only · Bet responsibly</div></div></div>
      </div>
      <div className="main-content" style={{ overflowX: "hidden", paddingBottom: 80 }}>
        {page === "dashboard" && <DashPage user={user} onUpgrade={() => setPage("pricing")} />}
        {page === "live" && <div style={{ padding: "28px 24px", maxWidth: 1060 }}><div style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>🔴 Live Football Data</div><div style={{ color: G.dim, fontSize: 14, marginBottom: 20 }}>Real-time scores, odds & fixtures from 9 leagues worldwide</div><LiveFixtures /></div>}
        {page === "worldcup" && <WCPage onUpgrade={() => startTrial(PLANS[1])} />}
        {page === "soccer" && <SoccerPage />}
        {page === "accumulator" && <AccaPage />}
        {page === "tracker" && <TrackerPage />}
        {page === "affiliate" && <AffiliatePage />}
        {page === "whatsapp" && <WAPage />}
        {page === "pricing" && <PricingPage onSelect={startTrial} />}
      </div>
    </div>
    <div className="mobile-bottom-nav" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 300, background: "rgba(5,8,15,.95)", backdropFilter: "blur(20px)", borderTop: `1px solid ${G.border}`, display: "none", alignItems: "center", justifyContent: "space-around", height: 64, padding: "0 8px" }}>
      {PAGES.slice(0, 6).map((p) => (<button key={p.key} onClick={() => setPage(p.key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", color: page === p.key ? G.accent : G.dim, fontFamily: "inherit", fontSize: 10, fontWeight: 600, cursor: "pointer", padding: "6px 8px", minWidth: 56 }}><span style={{ fontSize: 20 }}>{p.ico}</span>{p.label}</button>))}
    </div>
  </>); }