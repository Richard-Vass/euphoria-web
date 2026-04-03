"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Music,
  Image,
  Settings,
  Menu,
  X,
  LogOut,
  Sparkles,
  DollarSign,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Rezervacie", icon: CalendarCheck },
  { href: "/admin/events", label: "Eventy", icon: Music },
  { href: "/admin/gallery", label: "Galeria", icon: Image },
  { href: "/admin/revenue", label: "Trzby", icon: DollarSign },
  { href: "/admin/settings", label: "Nastavenia", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const stored = sessionStorage.getItem("euphoria-admin-auth");
    if (stored === "true") {
      setIsAuthed(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "euphoria2026";
    if (pin === correctPin) {
      sessionStorage.setItem("euphoria-admin-auth", "true");
      setIsAuthed(true);
      setError("");
    } else {
      setError("Nespravny PIN kod");
      setPin("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("euphoria-admin-auth");
    setIsAuthed(false);
    setPin("");
  };

  if (loading) {
    return (
      <html lang="sk">
        <body className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-[#d4af37] text-lg font-[family-name:var(--font-ui)]">
            Nacitavam...
          </div>
        </body>
      </html>
    );
  }

  if (!isAuthed) {
    return (
      <html lang="sk">
        <body className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
          <div className="w-full max-w-sm mx-auto px-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h1 className="text-3xl font-bold text-[#d4af37] font-[family-name:var(--font-heading)] mb-2">
                Euphoria
              </h1>
              <p className="text-[#c0b8b0] text-sm font-[family-name:var(--font-ui)] uppercase tracking-[0.15em]">
                Admin Panel
              </p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c41e2a] to-transparent mx-auto mt-4" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-ui)] mb-2">
                  PIN Kod
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Zadajte PIN"
                  className="w-full bg-white/5 border border-[rgba(212,175,55,0.2)] rounded px-4 py-3 text-white outline-none focus:border-[#d4af37] focus:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-[#c41e2a] text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#dc143c] via-[#c41e2a] to-[#8b0000] text-white font-[family-name:var(--font-ui)] font-semibold uppercase tracking-[0.15em] text-sm rounded-[50px] border border-[rgba(212,175,55,0.25)] hover:shadow-[0_8px_35px_rgba(196,30,42,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Prihlasit sa
              </button>
            </form>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="sk">
      <body className="bg-[#050505] text-white min-h-screen">
        <div className="flex min-h-screen">
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0d0507] border-r border-[rgba(212,175,55,0.12)] flex flex-col transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            {/* Logo */}
            <div className="p-6 border-b border-[rgba(212,175,55,0.12)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#d4af37] font-[family-name:var(--font-heading)]">
                    Euphoria
                  </h2>
                  <p className="text-[#c0b8b0] text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-ui)]">
                    Admin Panel
                  </p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-[#c0b8b0] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-[family-name:var(--font-ui)] transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[rgba(196,30,42,0.15)] to-[rgba(212,175,55,0.1)] text-[#d4af37] border border-[rgba(212,175,55,0.2)]"
                        : "text-[#c0b8b0] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-[rgba(212,175,55,0.12)]">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-[family-name:var(--font-ui)] text-[#c0b8b0] hover:text-[#c41e2a] hover:bg-[rgba(196,30,42,0.08)] transition-all cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                Odhlasit sa
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Top bar */}
            <header className="h-16 border-b border-[rgba(212,175,55,0.12)] flex items-center px-6 bg-[#0d0507]/80 backdrop-blur-sm sticky top-0 z-30">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 text-[#c0b8b0] hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold font-[family-name:var(--font-ui)] text-white">
                {navItems.find((n) => pathname.startsWith(n.href))?.label || "Admin"}
              </h1>
            </header>

            {/* Content */}
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
