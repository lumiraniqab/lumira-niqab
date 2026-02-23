"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
    createdAt: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);
    const [form, setForm] = useState({ name: "", description: "" });
    const [saving, setSaving] = useState(false);

    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/categories");
            if (res.ok) setCategories(await res.json());
        } catch (e) {
            console.error("Failed to fetch categories:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const openNew = () => {
        setEditing(null);
        setForm({ name: "", description: "" });
        setShowModal(true);
    };

    const openEdit = (cat: Category) => {
        setEditing(cat);
        setForm({ name: cat.name, description: cat.description });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const url = editing ? `/api/admin/categories/${editing._id}` : "/api/admin/categories";
            const method = editing ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setShowModal(false);
                fetchCategories();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to save");
            }
        } catch {
            alert("Error saving category");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this category?")) return;
        try {
            const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
            if (res.ok) fetchCategories();
        } catch {
            alert("Error deleting category");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-light text-[#0a0a0a]">Categories</h1>
                    <p className="text-sm text-stone-400 mt-1">{categories.length} categories</p>
                </div>
                <button
                    onClick={openNew}
                    className="flex items-center gap-2 gold-gradient px-5 py-2.5 text-[10px] font-bold tracking-[0.25em] uppercase text-black rounded-lg hover:opacity-90 transition-opacity"
                >
                    <Plus size={16} />
                    Add Category
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
                {categories.length === 0 ? (
                    <div className="p-10 text-center">
                        <p className="text-stone-400 text-sm">No categories yet. Create your first one.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-black/5 bg-stone-50/50">
                                <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold">Name</th>
                                <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold hidden md:table-cell">Slug</th>
                                <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold hidden md:table-cell">Description</th>
                                <th className="text-left px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold">Status</th>
                                <th className="text-right px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/[0.03]">
                            {categories.map((cat) => (
                                <tr key={cat._id} className="hover:bg-stone-50/50 transition-colors">
                                    <td className="px-5 py-3.5 text-sm font-medium text-[#0a0a0a]">{cat.name}</td>
                                    <td className="px-5 py-3.5 text-xs text-stone-400 hidden md:table-cell">{cat.slug}</td>
                                    <td className="px-5 py-3.5 text-xs text-stone-400 hidden md:table-cell max-w-xs truncate">{cat.description || "—"}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`text-[9px] tracking-wider uppercase font-semibold ${cat.isActive ? "text-emerald-500" : "text-stone-400"}`}>
                                            {cat.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => openEdit(cat)} className="p-2 text-stone-400 hover:text-[#c5a059] transition-colors rounded-lg hover:bg-[#c5a059]/5">
                                                <Pencil size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(cat._id)} className="p-2 text-stone-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white rounded-xl w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
                            <h2 className="text-lg font-serif font-light text-[#0a0a0a]">
                                {editing ? "Edit Category" : "New Category"}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-600">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs text-stone-500 tracking-wide mb-1.5">Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="e.g. Niqabs"
                                    className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-stone-500 tracking-wide mb-1.5">Description</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Optional description"
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40 transition-colors resize-none"
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-black/5 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-5 py-2 text-xs font-semibold text-stone-500 hover:text-stone-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !form.name.trim()}
                                className="px-5 py-2 gold-gradient text-black text-xs font-bold tracking-[0.2em] uppercase rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                            >
                                {saving ? "Saving..." : editing ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
