"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from "lucide-react";

interface Product {
    _id: string;
    name: string;
    slug: string;
    basePrice: number;
    isActive: boolean;
    category?: { _id: string; name: string };
    variants: { name: string; stock: number; price: number }[];
    createdAt: string;
}

interface Category {
    _id: string;
    name: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterCat, setFilterCat] = useState("");

    const fetchProducts = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            if (search) params.set("search", search);
            if (filterCat) params.set("category", filterCat);
            const res = await fetch(`/api/admin/products?${params}`);
            if (res.ok) setProducts(await res.json());
        } catch (e) {
            console.error("Failed to fetch products:", e);
        } finally {
            setLoading(false);
        }
    }, [search, filterCat]);

    useEffect(() => {
        fetch("/api/admin/categories").then(r => r.json()).then(setCategories).catch(() => { });
    }, []);

    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => fetchProducts(), 300);
        return () => clearTimeout(t);
    }, [fetchProducts]);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this product and all its variants?")) return;
        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
            if (res.ok) fetchProducts();
        } catch {
            alert("Error deleting product");
        }
    };

    const totalStock = (variants: Product["variants"]) =>
        variants.reduce((sum, v) => sum + v.stock, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-light text-[#0a0a0a]">Products</h1>
                    <p className="text-sm text-stone-400 mt-1">{products.length} products</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center gap-2 gold-gradient px-5 py-2.5 text-[10px] font-bold tracking-[0.25em] uppercase text-black rounded-lg hover:opacity-90 transition-opacity"
                >
                    <Plus size={16} />
                    Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40 transition-colors bg-white"
                    />
                </div>
                <select
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value)}
                    className="px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40 bg-white text-stone-600"
                >
                    <option value="">All Categories</option>
                    {categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="h-8 w-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-10 text-center">
                        <p className="text-stone-400 text-sm">No products found.</p>
                        <Link href="/admin/products/new" className="text-xs text-[#c5a059] hover:underline mt-1 inline-block">
                            Create your first product →
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-black/5 bg-stone-50/50">
                                    <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold">Product</th>
                                    <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold hidden md:table-cell">Category</th>
                                    <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold">Price</th>
                                    <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold hidden sm:table-cell">Variants</th>
                                    <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold hidden sm:table-cell">Stock</th>
                                    <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold">Status</th>
                                    <th className="text-right px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/[0.03]">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-stone-50/50 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm font-medium text-[#0a0a0a]">{product.name}</p>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-stone-400 hidden md:table-cell">
                                            {product.category?.name || "—"}
                                        </td>
                                        <td className="px-5 py-3.5 text-sm font-medium text-[#0a0a0a]">
                                            ₹{product.basePrice}
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-stone-400 hidden sm:table-cell">
                                            {product.variants.length}
                                        </td>
                                        <td className="px-5 py-3.5 hidden sm:table-cell">
                                            <span className={`text-xs font-medium ${totalStock(product.variants) <= 5 ? "text-amber-500" : "text-stone-600"}`}>
                                                {totalStock(product.variants)}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center gap-1 text-[9px] tracking-wider uppercase font-semibold ${product.isActive ? "text-emerald-500" : "text-stone-400"}`}>
                                                {product.isActive ? <Eye size={10} /> : <EyeOff size={10} />}
                                                {product.isActive ? "Active" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/admin/products/${product._id}`}
                                                    className="p-2 text-stone-400 hover:text-[#c5a059] transition-colors rounded-lg hover:bg-[#c5a059]/5"
                                                >
                                                    <Pencil size={14} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-stone-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
