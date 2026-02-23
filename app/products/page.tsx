import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

async function getProducts() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/admin/products`, { cache: 'no-store' });
        if (!res.ok) return [];
        const products = await res.json();
        // Only return active products
        return products.filter((p: any) => p.isActive);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export default async function Products() {
    const products = await getProducts();

    return (
        <main className="min-h-screen bg-white pt-24">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-stone-400 text-xs tracking-widest uppercase mb-4">
                            <Link href="/" className="hover:text-stone-800 transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-[#0a0a0a] font-semibold">Shop All</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif text-[#0a0a0a]">
                            The <span className="text-[#c5a059] italic font-light">Collection</span>
                        </h1>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between border-y border-stone-200 py-4 mb-12">
                    <p className="text-sm font-light text-stone-500">{products.length} Products</p>
                    <button className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-stone-600 hover:text-black transition-colors">
                        <Filter size={14} />
                        Filter & Sort
                    </button>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-32 border border-dashed border-stone-200 rounded-lg">
                        <p className="text-stone-500 font-serif italic text-xl">No products available at the moment.</p>
                        <p className="text-stone-400 text-sm mt-3">Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-12">
                        {products.map((product: any) => (
                            <Link key={product._id} href={`/products/${product._id}`} className="group flex flex-col">
                                {/* Image Box */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm mb-5">
                                    {product.images && product.images[0] ? (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                                            <span className="font-serif italic text-sm">No Image</span>
                                        </div>
                                    )}
                                    {product.variants?.length > 1 && (
                                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] font-bold tracking-widest uppercase text-black">
                                            {product.variants.length} Options
                                        </div>
                                    )}
                                </div>

                                {/* Info Box */}
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-[#0a0a0a] font-serif text-lg mb-1 group-hover:text-[#c5a059] transition-colors">{product.name}</h3>
                                    <p className="text-stone-500 text-xs font-light tracking-wide mb-3">{product.category?.name || "Premium Collection"}</p>
                                    <p className="text-[#0a0a0a] font-medium mt-auto">₹{product.basePrice}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
