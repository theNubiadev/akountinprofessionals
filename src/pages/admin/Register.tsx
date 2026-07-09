import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/api";
export default function Register() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [busy,     setBusy]     = useState(false);
  const [error,    setError]    = useState("");

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
     

      await auth.register(name, email, password);

      // Auto-login — session is already set server-side
      await login(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

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