import { useState } from "react";
import { G } from "@/lib/theme";
import type { Plan } from "@/lib/data";
import { Input, PrimaryButton, Chip } from "@/components/ui-primitives";

interface AuthModalProps {
  mode?: "signin" | "signup" | "forgot";
  plan?: Plan | null;
  onClose: () => void;
  onSuccess: (
    user: {
      id: string;
      name: string;
      email: string;
      plan?: Plan;
      trial: boolean;
      subscribed?: boolean;
    }
  ) => void;
}

export function AuthModal({
  mode: m0 = "signup",
  plan,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState(m0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ t: "e" | "s"; v: string } | null>(null);

  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7);
  const ted = trialEnd.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });

  async function doSignup() {
    if (!name || !email || !pw) {
      setMsg({ t: "e", v: "Fill in all fields." });
      return;
    }
    if (pw.length < 8) {
      setMsg({ t: "e", v: "Password must be 8+ characters." });
      return;
    }
    if (pw !== cpw) {
      setMsg({ t: "e", v: "Passwords don't match." });
      return;
    }
    setLoading(true);
    setMsg(null);
    await new Promise((r) => setTimeout(r, 1600));
    const u = {
      id: "u_" + Date.now(),
      name,
      email,
      plan,
      trial: true,
      trialStart: new Date().toISOString(),
    };
    localStorage.setItem("ea_user", JSON.stringify(u));
    setMsg({ t: "s", v: "Account created! Loading checkout..." });
    await new Promise((r) => setTimeout(r, 900));
    onSuccess(u as any);
  }

  async function doSignin() {
    if (!email || !pw) {
      setMsg({ t: "e", v: "Enter email and password." });
      return;
    }
    setLoading(true);
    setMsg(null);
    await new Promise((r) => setTimeout(r, 1400));
    const saved = localStorage.getItem("ea_user");
    if (saved) {
      const u = JSON.parse(saved);
      setMsg({ t: "s", v: "Welcome back!" });
      await new Promise((r) => setTimeout(r, 700));
      onSuccess(u);
    } else {
      setMsg({ t: "e", v: "No account found. Please sign up." });
    }
    setLoading(false);
  }

  async function doReset() {
    if (!email) {
      setMsg({ t: "e", v: "Enter your email." });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setMsg({ t: "s", v: `Reset link sent to ${email}` });
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.82)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        className="pop"
        style={{
          background: G.card,
          border: `1px solid ${G.border}`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 420,
          padding: 32,
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "none",
            border: "none",
            color: G.dim,
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          ✕
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              background: G.grad,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              color: "#000",
              fontSize: 16,
            }}
          >
            ⚡
          </div>
          <span style={{ fontWeight: 900, fontSize: 17 }}>
            EDGE<span style={{ color: G.accent }}>AI</span>
          </span>
        </div>
        {msg && (
          <div
            style={{
              padding: "10px 14px",
              background:
                msg.t === "s"
                  ? "rgba(0,255,136,.08)"
                  : "rgba(255,69,96,.1)",
              border: `1px solid ${msg.t === "s" ? "rgba(0,255,136,.2)" : "rgba(255,69,96,.2)"}`,
              borderRadius: 8,
              fontSize: 13,
              color: msg.t === "s" ? G.green : G.red,
              marginBottom: 14,
            }}
          >
            {msg.v}
          </div>
        )}
        {mode === "forgot" && (
          <>
            <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>
              Reset Password
            </div>
            <div style={{ color: G.dim, fontSize: 13, marginBottom: 18 }}>
              We'll email you a reset link.
            </div>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={setEmail}
            />
            <PrimaryButton onClick={doReset} loading={loading}>
              Send Reset Link
            </PrimaryButton>
            <div
              style={{
                textAlign: "center",
                marginTop: 14,
                fontSize: 13,
                color: G.dim,
              }}
            >
              <span
                style={{ color: G.accent, cursor: "pointer" }}
                onClick={() => {
                  setMode("signin");
                  setMsg(null);
                }}
              >
                ← Back to Sign In
              </span>
            </div>
          </>
        )}
        {mode === "signin" && (
          <>
            <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>
              Welcome Back
            </div>
            <div style={{ color: G.dim, fontSize: 13, marginBottom: 18 }}>
              Sign in to your EdgeAI account.
            </div>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={setEmail}
            />
            <Input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={setPw}
              onKeyDown={doSignin}
            />
            <div
              style={{
                textAlign: "right",
                marginTop: -8,
                marginBottom: 14,
              }}
            >
              <span
                style={{ fontSize: 12, color: G.accent, cursor: "pointer" }}
                onClick={() => {
                  setMode("forgot");
                  setMsg(null);
                }}
              >
                Forgot password?
              </span>
            </div>
            <PrimaryButton onClick={doSignin} loading={loading}>
              Sign In →
            </PrimaryButton>
            <div
              style={{
                textAlign: "center",
                marginTop: 14,
                fontSize: 13,
                color: G.dim,
              }}
            >
              No account?{' '}
              <span
                style={{ color: G.accent, cursor: "pointer" }}
                onClick={() => {
                  setMode("signup");
                  setMsg(null);
                }}
              >
                Start free trial
              </span>
            </div>
          </>
        )}
        {mode === "signup" && (
          <>
            {plan && (
              <div
                style={{
                  background: "rgba(0,255,136,.06)",
                  border: "1px solid rgba(0,255,136,.18)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    color: G.green,
                    fontSize: 14,
                  }}
                >
                  🎁 7-Day Free Trial — {plan.name} ${plan.price}/mo
                </div>
                <div style={{ fontSize: 12, color: G.dim, marginTop: 2 }}>
                  No charge until {ted} · Cancel anytime
                </div>
              </div>
            )}
            <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>
              Create Account
            </div>
            <div style={{ color: G.dim, fontSize: 13, marginBottom: 18 }}>
              Start your free 7-day trial. No payment today.
            </div>
            <Input
              placeholder="Full Name"
              value={name}
              onChange={setName}
            />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={setEmail}
            />
            <Input
              type="password"
              placeholder="Password (8+ characters)"
              value={pw}
              onChange={setPw}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={cpw}
              onChange={setCpw}
              onKeyDown={doSignup}
            />
            <div
              style={{
                fontSize: 12,
                color: G.dim,
                marginBottom: 14,
                lineHeight: 1.6,
              }}
            >
              By signing up you agree to our{' '}
              <span style={{ color: G.accent }}>Terms</span> &{' '}
              <span style={{ color: G.accent }}>Privacy Policy</span>. 18+
              only.
            </div>
            <PrimaryButton
              onClick={doSignup}
              loading={loading}
              gradient="gradGreen"
            >
              Start 7-Day Free Trial 🚀
            </PrimaryButton>
            <div
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 12,
                color: G.muted,
              }}
            >
              No charge today · Cancel anytime before day 8
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: 14,
                fontSize: 13,
                color: G.dim,
              }}
            >
              Already have an account?{' '}
              <span
                style={{ color: G.accent, cursor: "pointer" }}
                onClick={() => {
                  setMode("signin");
                  setMsg(null);
                }}
              >
                Sign in
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
