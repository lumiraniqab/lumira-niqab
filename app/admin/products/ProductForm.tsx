"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Variant {
    _id?: string;
    name: string;
    color: string;
    size: string;
    price: number;
    stock: number;
    sku: string;
    isActive: boolean;
}

interface Category {
    _id: string;
    name: string;
}

interface ProductFormProps {
    productId?: string;
}

export default function ProductForm({ productId }: ProductFormProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEdit = !!productId;

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        basePrice: 0,
        isActive: true,
        images: [] as string[],
    });
    const [variants, setVariants] = useState<Variant[]>([]);

    // Fetch categories
    useEffect(() => {
        fetch("/api/admin/categories")
            .then(r => r.json())
            .then(setCategories)
            .catch(() => { });
    }, []);

    // Fetch existing product if editing
    useEffect(() => {
        if (productId) {
            fetch(`/api/admin/products/${productId}`)
                .then(r => r.json())
                .then((product) => {
                    setForm({
                        name: product.name || "",
                        description: product.description || "",
                        category: product.category?._id || product.category || "",
                        basePrice: product.basePrice || 0,
                        isActive: product.isActive ?? true,
                        images: product.images || [],
                    });
                    setVariants(product.variants || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [productId]);

    const updateForm = (key: string, value: unknown) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    // ---- Variants ----
    const addVariant = () => {
        setVariants(prev => [...prev, {
            name: "",
            color: "",
            size: "",
            price: form.basePrice,
            stock: 0,
            sku: "",
            isActive: true,
        }]);
    };

    const updateVariant = (index: number, key: string, value: unknown) => {
        setVariants(prev => prev.map((v, i) => i === index ? { ...v, [key]: value } : v));
    };

    const removeVariant = (index: number) => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };

    // ---- Image Upload ----
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                });
                if (res.ok) {
                    const data = await res.json();
                    setForm(prev => ({ ...prev, images: [...prev.images, data.url] }));
                }
            } catch {
                console.error("Upload failed for", file.name);
            }
        }

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeImage = (index: number) => {
        setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    // ---- Save ----
    const handleSave = async () => {
        if (!form.name.trim() || !form.category) {
            alert("Please fill in the product name and select a category.");
            return;
        }

        setSaving(true);
        try {
            const url = isEdit ? `/api/admin/products/${productId}` : "/api/admin/products";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, variants }),
            });

            if (res.ok) {
                router.push("/admin/products");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to save product");
            }
        } catch {
            alert("Error saving product");
        } finally {
            setSaving(false);
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
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 text-stone-400 hover:text-stone-600 transition-colors rounded-lg hover:bg-stone-100">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-serif font-light text-[#0a0a0a]">
                        {isEdit ? "Edit Product" : "New Product"}
                    </h1>
                    <p className="text-sm text-stone-400 mt-0.5">
                        {isEdit ? "Update product details and variants" : "Add a new product to your store"}
                    </p>
                </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-black/5">
                    <h2 className="text-sm font-medium text-[#0a0a0a]">Basic Information</h2>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs text-stone-500 tracking-wide mb-1.5">Product Name *</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => updateForm("name", e.target.value)}
                                placeholder="e.g. Classic Egyptian Niqab"
                                className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-stone-500 tracking-wide mb-1.5">Category *</label>
                            <select
                                value={form.category}
                                onChange={e => updateForm("category", e.target.value)}
                                className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40 text-stone-600 bg-white"
                            >
                                <option value="">Select category</option>
                                {categories.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-stone-500 tracking-wide mb-1.5">Description</label>
                        <textarea
                            value={form.description}
                            onChange={e => updateForm("description", e.target.value)}
                            placeholder="Describe the product..."
                            rows={4}
                            className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40 transition-colors resize-none"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs text-stone-500 tracking-wide mb-1.5">Base Price (₹) *</label>
                            <input
                                type="number"
                                value={form.basePrice}
                                onChange={e => updateForm("basePrice", parseFloat(e.target.value) || 0)}
                                min="0"
                                className="w-full px-4 py-2.5 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40 transition-colors"
                            />
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-3 cursor-pointer p-2.5">
                                <div className={`relative w-10 h-5 rounded-full transition-colors ${form.isActive ? "bg-emerald-500" : "bg-stone-300"}`}>
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${form.isActive ? "left-5" : "left-0.5"}`} />
                                </div>
                                <span className="text-sm text-stone-600">{form.isActive ? "Active" : "Draft"}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-black/5">
                    <h2 className="text-sm font-medium text-[#0a0a0a]">Images</h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap gap-3">
                        {form.images.map((url, index) => (
                            <div key={index} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-black/5">
                                <Image src={url} alt="" fill className="object-cover" />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={10} className="text-white" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-24 h-24 rounded-lg border-2 border-dashed border-black/10 hover:border-[#c5a059]/30 flex flex-col items-center justify-center gap-1 text-stone-400 hover:text-[#c5a059] transition-colors"
                        >
                            {form.images.length === 0 ? <ImageIcon size={18} /> : <Upload size={18} />}
                            <span className="text-[9px] tracking-wider uppercase font-semibold">Upload</span>
                        </button>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Variants */}
            <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-medium text-[#0a0a0a]">Variants</h2>
                        <p className="text-xs text-stone-400 mt-0.5">Add size, color, and stock variants</p>
                    </div>
                    <button
                        onClick={addVariant}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#c5a059] hover:text-[#8b7355] transition-colors"
                    >
                        <Plus size={14} />
                        Add Variant
                    </button>
                </div>
                <div className="p-6">
                    {variants.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed border-black/5 rounded-lg">
                            <p className="text-sm text-stone-400 mb-2">No variants added yet</p>
                            <button onClick={addVariant} className="text-xs text-[#c5a059] hover:underline">
                                + Add your first variant
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {variants.map((variant, index) => (
                                <div key={index} className="border border-black/5 rounded-lg p-4 hover:border-black/10 transition-colors">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[9px] tracking-[0.3em] uppercase text-stone-400 font-semibold">
                                            Variant {index + 1}
                                        </span>
                                        <button
                                            onClick={() => removeVariant(index)}
                                            className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-[10px] text-stone-400 mb-1">Name *</label>
                                            <input
                                                type="text"
                                                value={variant.name}
                                                onChange={e => updateVariant(index, "name", e.target.value)}
                                                placeholder="e.g. Black - Large"
                                                className="w-full px-3 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-stone-400 mb-1">Color</label>
                                            <input
                                                type="text"
                                                value={variant.color}
                                                onChange={e => updateVariant(index, "color", e.target.value)}
                                                placeholder="e.g. Black"
                                                className="w-full px-3 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-stone-400 mb-1">Size</label>
                                            <input
                                                type="text"
                                                value={variant.size}
                                                onChange={e => updateVariant(index, "size", e.target.value)}
                                                placeholder="e.g. Large"
                                                className="w-full px-3 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-stone-400 mb-1">Price (₹)</label>
                                            <input
                                                type="number"
                                                value={variant.price}
                                                onChange={e => updateVariant(index, "price", parseFloat(e.target.value) || 0)}
                                                min="0"
                                                className="w-full px-3 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-stone-400 mb-1">Stock</label>
                                            <input
                                                type="number"
                                                value={variant.stock}
                                                onChange={e => updateVariant(index, "stock", parseInt(e.target.value) || 0)}
                                                min="0"
                                                className="w-full px-3 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] text-stone-400 mb-1">SKU</label>
                                            <input
                                                type="text"
                                                value={variant.sku}
                                                onChange={e => updateVariant(index, "sku", e.target.value)}
                                                placeholder="e.g. NIQ-BLK-L"
                                                className="w-full px-3 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#c5a059]/40"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pb-8">
                <Link
                    href="/admin/products"
                    className="px-6 py-2.5 text-sm text-stone-500 hover:text-stone-700 transition-colors"
                >
                    Cancel
                </Link>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-8 py-2.5 gold-gradient text-black text-xs font-bold tracking-[0.3em] uppercase rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                    {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
                </button>
            </div>
        </div>
    );
}
