import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    // Tiny centred spinner — avoids a flash of the login page on refresh
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#14213D] border-t-[#C9A227] rounded-full animate-spin" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
}