// import { useState, type FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";

// export default function AdminLogin() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [busy, setBusy] = useState(false);

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     setError("");
//     setBusy(true);
//     try {
//       await login(email, password);
//       navigate("/admin/dashboard", { replace: true });
//     } catch (err) {
//       setError((err as Error).message || "Sign-in failed.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#14213D] flex items-center justify-center px-4">
//       {/* Subtle background grid */}
//       <div
//         className="absolute inset-0 opacity-[0.04]"
//         style={{
//           backgroundImage:
//             "linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)",
//           backgroundSize: "40px 40px",
//         }}
//       />

//       <div className="relative w-full max-w-sm">
//         {/* Brand mark */}
//         <div className="mb-8 text-center">
//           <p className="text-[#C9A227] text-[10px] uppercase tracking-[0.2em] font-medium mb-2">
//             Akountin Professionals
//           </p>
//           <h1 className="font-serif text-white text-3xl leading-tight">
//             Blog Dashboard
//           </h1>
//           <p className="text-white/40 text-sm mt-2">
//             Sign in to manage posts
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-xl shadow-2xl p-8 space-y-5"
//         >
//           <div className="space-y-1.5">
//             <label className="block text-xs font-semibold text-[#14213D] uppercase tracking-wide">
//               Email address
//             </label>
//             <input
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="editor@akountinprofessionals.co.uk"
//               className="w-full px-3.5 py-2.5 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] placeholder:text-[#B0A99A] focus:outline-none focus:border-[#14213D] transition-colors bg-[#F8F6F1]"
//             />
//           </div>

//           <div className="space-y-1.5">
//             <label className="block text-xs font-semibold text-[#14213D] uppercase tracking-wide">
//               Password
//             </label>
//             <input
//               type="password"
//               autoComplete="current-password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full px-3.5 py-2.5 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] placeholder:text-[#B0A99A] focus:outline-none focus:border-[#14213D] transition-colors bg-[#F8F6F1]"
//             />
//           </div>

//           {error && (
//             <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={busy}
//             className="w-full bg-[#14213D] hover:bg-[#1a2d54] disabled:opacity-60 text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
//           >
//             {busy ? (
//               <>
//                 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 Signing in…
//               </>
//             ) : (
//               "Sign in"
//             )}
//           </button>
//         </form>

//         <p className="text-center text-white/25 text-xs mt-6">
//           Internal tool · Akountin Professionals
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [error,      setError]      = useState("");
  const [busy,       setBusy]       = useState(false);
  const [unverified, setUnverified] = useState(false);
  const [resent,     setResent]     = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setUnverified(false);
    setBusy(true);

    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      const msg = (err as Error).message;

      // Check if it's the unverified error (we set unverified:true in the API)
      if (msg.toLowerCase().includes("verify your email")) {
        setUnverified(true);
      } else {
        setError(msg || "Sign-in failed.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function resendVerification() {
    setResent(false);
    try {
      const res  = await fetch("/api/auth/resend-verification", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResent(true);
    } catch (err) {
      setError((err as Error).message);
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
          <h1 className="font-serif text-white text-3xl leading-tight">Blog Dashboard</h1>
          <p className="text-white/40 text-sm mt-2">Sign in to manage posts</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 space-y-5">

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#14213D] uppercase tracking-wide">
              Email address
            </label>
            <input
              type="email"
              autoComplete="email"
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 border border-[#E3DFD6] rounded-lg text-sm text-[#14213D] placeholder:text-[#B0A99A] focus:outline-none focus:border-[#14213D] transition-colors bg-[#F8F6F1]"
            />
          </div>

          {/* Generic error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
              {error}
            </p>
          )}

          {/* Unverified state */}
          {unverified && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3.5 py-3 space-y-2">
              <p className="text-sm text-amber-800 font-medium">Email not verified</p>
              <p className="text-xs text-amber-700">
                Please check your inbox for the verification link.
              </p>
              {resent ? (
                <p className="text-xs text-green-700 font-medium">
                  ✓ Verification email resent — check your inbox.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={resendVerification}
                  className="text-xs text-amber-800 underline font-medium hover:text-amber-900"
                >
                  Resend verification email
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#14213D] hover:bg-[#1a2d54] disabled:opacity-60 text-white font-medium text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {busy ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>

          <p className="text-center text-sm text-[#9C9384] pt-1">
            Don't have an account?{" "}
            <Link to="/admin/register" className="text-[#C9A227] hover:underline font-medium">
              Create one
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