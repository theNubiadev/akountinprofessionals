import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

type Status = "verifying" | "success" | "error";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status,  setStatus]  = useState<Status>("verifying");
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found. Please check your email link.");
      return;
    }

    fetch(`/api/auth/verify/${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Verification failed.");
        setStatus("success");
        setMessage(data.message);
      })
      .catch((err) => {
        setStatus("error");
        setMessage((err as Error).message);
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-[#14213D] flex items-center justify-center px-4">
      <div className="relative w-full max-w-sm">

        <div className="mb-8 text-center">
          <p className="text-[#C9A227] text-[10px] uppercase tracking-[0.2em] font-medium mb-2">
            Akountin Professionals
          </p>
          <h1 className="font-serif text-white text-3xl leading-tight">Email verification</h1>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">

          {/* Verifying */}
          {status === "verifying" && (
            <>
              <div className="w-6 h-6 border-2 border-[#14213D] border-t-[#C9A227] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-[#6B6B6B]">Verifying your email…</p>
            </>
          )}

          {/* Success */}
          {status === "success" && (
            <>
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-serif text-xl text-[#14213D] mb-2">Email verified!</h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">
                {message || "Your account is now active. You can sign in."}
              </p>
              <Link
                to="/admin/login"
                className="inline-block bg-[#C9A227] hover:bg-[#B8941F] text-[#14213D] font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              >
                Sign in to dashboard
              </Link>
            </>
          )}

          {/* Error */}
          {status === "error" && (
            <>
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="font-serif text-xl text-[#14213D] mb-2">Verification failed</h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">{message}</p>
              <div className="space-y-3">
                <ResendButton />
                <div>
                  <Link to="/admin/login" className="text-sm text-[#9C9384] hover:text-[#14213D] transition-colors">
                    Back to sign in
                  </Link>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

// ── Resend verification email ─────────────────────────────────────────────────
function ResendButton() {
  const [email,   setEmail]   = useState("");
  const [busy,    setBusy]    = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState("");
  const [showing, setShowing] = useState(false);

  async function resend() {
    if (!email) return;
    setBusy(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/resend-verification", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return <p className="text-sm text-green-600 font-medium">Verification email resent — check your inbox.</p>;
  }

  if (!showing) {
    return (
      <button
        onClick={() => setShowing(true)}
        className="text-sm text-[#C9A227] hover:underline font-medium"
      >
        Resend verification email
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-3.5 py-2 border border-[#E3DFD6] rounded-lg text-sm focus:outline-none focus:border-[#14213D] bg-[#F8F6F1]"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        onClick={resend}
        disabled={busy || !email}
        className="w-full bg-[#14213D] text-white text-sm font-medium py-2 rounded-lg disabled:opacity-50 transition-colors"
      >
        {busy ? "Sending…" : "Send verification email"}
      </button>
    </div>
  );
}