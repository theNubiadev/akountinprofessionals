import { useState } from "react";
import CreatePublication from "@/components/CreatePublication";
import BlogManager from "@/components/BlogManager";

export default function EditorDashboard() {
  const [activeTab, setActiveTab] = useState("create"); // "create" | "manage"
  const [refreshKey, setRefreshKey] = useState(0);

  function handlePublished() {
    setRefreshKey((k) => k + 1);
    setActiveTab("manage");
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-screen bg-[#14213D] text-white px-5 py-8 hidden md:block">
          <h1 className="font-serif text-xl leading-tight">
            Akountin
            <span className="block text-sm font-sans text-[#C9A227] tracking-wide">
              Editor Dashboard
            </span>
          </h1>

          <nav className="mt-10 space-y-1">
            <NavButton
              label="New publication"
              active={activeTab === "create"}
              onClick={() => setActiveTab("create")}
            />
            <NavButton
              label="All posts"
              active={activeTab === "manage"}
              onClick={() => setActiveTab("manage")}
            />
          </nav>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#14213D] flex z-10">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-3 text-sm ${
              activeTab === "create" ? "text-[#C9A227]" : "text-white/70"
            }`}
          >
            New post
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex-1 py-3 text-sm ${
              activeTab === "manage" ? "text-[#C9A227]" : "text-white/70"
            }`}
          >
            All posts
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 px-6 md:px-10 py-8 pb-24 md:pb-8 max-w-6xl">
          {activeTab === "create" ? (
            <CreatePublication onPublished={handlePublished} />
          ) : (
            <BlogManager refreshKey={refreshKey} />
          )}
        </main>
      </div>
    </div>
  );
}

function NavButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left text-sm px-3 py-2.5 rounded-md transition-colors ${
        active ? "bg-white/10 text-[#C9A227]" : "text-white/75 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}