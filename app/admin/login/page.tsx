"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (!res.ok) {
                setError("Invalid password");
                setLoading(false);
                return;
            }

            router.push("/admin");
        } catch {
            setError("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] px-4">
            <div className="w-full max-w-sm">
                {/* Brand */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 border border-[#c5a059]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                        <span className="text-[#c5a059] text-xl font-serif italic">LN</span>
                    </div>
                    <h1 className="text-white text-xl font-serif tracking-[0.15em]">LUMIRA</h1>
                    <p className="text-stone-600 text-[9px] tracking-[0.4em] uppercase mt-1">Admin Panel</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-stone-500 text-xs tracking-wide mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-stone-600 focus:outline-none focus:border-[#c5a059]/40 transition-colors"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 gold-gradient text-black text-xs font-bold tracking-[0.3em] uppercase rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
