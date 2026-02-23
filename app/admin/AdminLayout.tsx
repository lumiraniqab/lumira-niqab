"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    FolderOpen,
    Package,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from "lucide-react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/categories", label: "Categories", icon: FolderOpen },
    { href: "/admin/products", label: "Products", icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const checkAuth = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/auth");
            if (!res.ok) {
                router.push("/admin/login");
                return;
            }
            setIsAuthenticated(true);
        } catch {
            router.push("/admin/login");
        }
    }, [router]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handleLogout = async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        router.push("/admin/login");
    };

    if (isAuthenticated === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0e0e0e]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
                    <p className="text-stone-500 text-xs tracking-[0.3em] uppercase">Loading</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="flex min-h-screen bg-[#f5f3f0]">
            {/* Sidebar — Desktop */}
            <aside className="hidden md:flex w-64 flex-col bg-[#0e0e0e] border-r border-white/5 fixed inset-y-0 left-0 z-40">
                {/* Brand */}
                <div className="px-6 py-6 border-b border-white/5">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-9 h-9 border border-[#c5a059]/25 rounded-full flex items-center justify-center">
                            <span className="text-[#c5a059] text-sm font-serif italic">L</span>
                        </div>
                        <div>
                            <p className="text-white text-sm font-semibold tracking-[0.15em] uppercase">Lumira</p>
                            <p className="text-stone-600 text-[9px] tracking-[0.2em] uppercase">Admin Panel</p>
                        </div>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                                    ${isActive
                                        ? "bg-[#c5a059]/10 text-[#c5a059]"
                                        : "text-stone-500 hover:text-stone-300 hover:bg-white/[0.03]"
                                    }`}
                            >
                                <item.icon size={18} />
                                <span className="font-medium">{item.label}</span>
                                {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 py-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-600 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 w-full"
                    >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <aside className="absolute inset-y-0 left-0 w-64 bg-[#0e0e0e] flex flex-col">
                        <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
                            <p className="text-white text-sm font-semibold tracking-[0.15em] uppercase">Lumira</p>
                            <button onClick={() => setSidebarOpen(false)} className="text-stone-500">
                                <X size={20} />
                            </button>
                        </div>
                        <nav className="flex-1 px-3 py-4 space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                                            ${isActive ? "bg-[#c5a059]/10 text-[#c5a059]" : "text-stone-500 hover:text-stone-300"}`}
                                    >
                                        <item.icon size={18} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="px-3 py-4 border-t border-white/5">
                            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 text-sm text-stone-600 hover:text-red-400 w-full">
                                <LogOut size={18} /><span>Logout</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-black/5">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-stone-600">
                        <Menu size={22} />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] tracking-[0.3em] uppercase text-stone-400 font-semibold">
                            {navItems.find(i => pathname === i.href || (i.href !== "/admin" && pathname.startsWith(i.href)))?.label || "Admin"}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
                            <span className="text-[#c5a059] text-xs font-serif italic">A</span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
