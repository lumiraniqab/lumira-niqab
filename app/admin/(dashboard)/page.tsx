"use client";

import { useEffect, useState } from "react";
import { Package, FolderOpen, TrendingUp, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
    totalProducts: number;
    totalCategories: number;
    activeProducts: number;
    lowStockProducts: number;
}

interface RecentProduct {
    _id: string;
    name: string;
    basePrice: number;
    isActive: boolean;
    category?: { name: string };
    variants: { name: string; stock: number }[];
    createdAt: string;
}

const statCards = [
    { key: "totalProducts", label: "Total Products", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
    { key: "totalCategories", label: "Categories", icon: FolderOpen, color: "text-purple-500", bg: "bg-purple-500/10" },
    { key: "activeProducts", label: "Active Products", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { key: "lowStockProducts", label: "Low Stock", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/admin/dashboard");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data.stats);
                    setRecentProducts(data.recentProducts || []);
                }
            } catch (e) {
                console.error("Failed to fetch dashboard:", e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-serif font-light text-[#0a0a0a]">Dashboard</h1>
                <p className="text-sm text-stone-400 mt-1">Overview of your store</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <div key={card.key} className="bg-white rounded-xl p-5 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                                <card.icon size={18} className={card.color} />
                            </div>
                        </div>
                        <p className="text-2xl font-semibold text-[#0a0a0a]">
                            {stats ? stats[card.key as keyof DashboardStats] : 0}
                        </p>
                        <p className="text-xs text-stone-400 mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-4 bg-[#0e0e0e] text-white rounded-xl p-5 hover:bg-[#1a1a1a] transition-colors group"
                >
                    <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 flex items-center justify-center group-hover:bg-[#c5a059]/20 transition-colors">
                        <Package size={18} className="text-[#c5a059]" />
                    </div>
                    <div>
                        <p className="text-sm font-medium">Add New Product</p>
                        <p className="text-xs text-stone-500">Create a product with variants</p>
                    </div>
                </Link>
                <Link
                    href="/admin/categories"
                    className="flex items-center gap-4 bg-white rounded-xl p-5 border border-black/5 hover:shadow-md transition-shadow group"
                >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <FolderOpen size={18} className="text-purple-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#0a0a0a]">Manage Categories</p>
                        <p className="text-xs text-stone-400">Add or edit categories</p>
                    </div>
                </Link>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
                <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
                    <h2 className="text-sm font-medium text-[#0a0a0a]">Recent Products</h2>
                    <Link href="/admin/products" className="text-xs text-[#c5a059] hover:underline">View All</Link>
                </div>
                {recentProducts.length === 0 ? (
                    <div className="p-8 text-center">
                        <Package size={32} className="mx-auto text-stone-300 mb-3" />
                        <p className="text-sm text-stone-400">No products yet</p>
                        <Link href="/admin/products/new" className="text-xs text-[#c5a059] hover:underline mt-1 inline-block">
                            Add your first product →
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-black/5">
                        {recentProducts.map((product) => (
                            <Link
                                key={product._id}
                                href={`/admin/products/${product._id}`}
                                className="flex items-center justify-between px-5 py-3.5 hover:bg-stone-50 transition-colors"
                            >
                                <div>
                                    <p className="text-sm font-medium text-[#0a0a0a]">{product.name}</p>
                                    <p className="text-xs text-stone-400">
                                        {product.category?.name || "—"} · {product.variants.length} variant{product.variants.length !== 1 ? "s" : ""}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-[#0a0a0a]">₹{product.basePrice}</p>
                                    <span className={`text-[9px] tracking-wider uppercase font-semibold ${product.isActive ? "text-emerald-500" : "text-stone-400"}`}>
                                        {product.isActive ? "Active" : "Draft"}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
