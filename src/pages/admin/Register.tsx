import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [busy,     setBusy]     = useState(false);
  const [error,    setError]    = useState("");
  const [done,     setDone]     = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed.");

      setDone(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen bg-[#14213D] flex items-center justify-center px-4">
        <div className="relative w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            {/* Envelope icon */}
            <div className="w-14 h-14 rounded-full bg-[#14213D] flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-[#C9A227]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
              </svg>
            </div>
            <h2 className="font-serif text-xl text-[#14213D] mb-2">Check your email</h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">
              We've sent a verification link to <strong className="text-[#14213D]">{email}</strong>.
              Click the link to activate your account.
            </p>
            <p className="text-xs text-[#9C9384] mb-6">
              The link expires in 24 hours. Check your spam folder if you don't see it.
            </p>
            <Link
              to="/admin/login"
              className="text-sm text-[#C9A227] hover:underline font-medium"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#14213D] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-[#C9A227] text-[10px] uppercase tracking-[0.2em] font-medium mb-2">
            Akountin Professionals
          </p>
          <h1 className="font-serif text-white text-3xl leading-tight">Create account</h1>
          <p className="text-white/40 text-sm mt-2">Blog Dashboard access</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 space-y-4">

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#14213D] uppercase tracking-wide">
              Full name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sarah Williams"
              className="w-full px-3.5 py-2.5 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] placeholder:text-[#B0A99A] focus:outline-none focus:border-[#14213D] transition-colors bg-[#F8F6F1]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#14213D] uppercase tracking-wide">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@akountinprofessionals.co.uk"
              className="w-full px-3.5 py-2.5 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] placeholder:text-[#B0A99A] focus:outline-none focus:border-[#14213D] transition-colors bg-[#F8F6F1]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#14213D] uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full px-3.5 py-2.5 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] placeholder:text-[#B0A99A] focus:outline-none focus:border-[#14213D] transition-colors bg-[#F8F6F1]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#14213D] uppercase tracking-wide">
              Confirm password
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full px-3.5 py-2.5 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] placeholder:text-[#B0A99A] focus:outline-none focus:border-[#14213D] transition-colors bg-[#F8F6F1]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#14213D] hover:bg-[#1a2d54] disabled:opacity-60 text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {busy ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>

          <p className="text-center text-sm text-[#9C9384] pt-1">
            Already have an account?{" "}
            <Link to="/admin/login" className="text-[#C9A227] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </form>

        <p className="text-center text-white/25 text-xs mt-6">
          Internal tool · Akountin Professionals
        </p>
      </div>
    </div>
  );
}