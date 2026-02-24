import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const dynamic = "force-dynamic";

async function getProduct(id: string) {
    try {
        await dbConnect();
        const product = await Product.findById(id).populate("category", "name").lean();
        if (!product || !product.isActive) return null;
        return JSON.parse(JSON.stringify(product));
    } catch {
        return null;
    }
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pt-24">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                <Link href="/products" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors uppercase tracking-widest text-[10px] font-semibold mb-12">
                    <ArrowLeft size={14} /> Back to Collection
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Images Column */}
                    <div className="space-y-6">
                        <div className="relative aspect-[3/4] w-full bg-stone-50 rounded-lg overflow-hidden border border-black/5">
                            {product.images && product.images[0] ? (
                                <Image src={product.images[0]} alt={product.name} fill className="object-cover" priority />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-stone-300 font-serif italic">No image available</div>
                            )}
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.slice(1).map((img: string, i: number) => (
                                    <div key={i} className="relative aspect-square bg-stone-50 rounded-md overflow-hidden border border-black/5 hover:border-[#c5a059]/50 transition-colors cursor-pointer">
                                        <Image src={img} alt={`${product.name} alternate view`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Column */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <span className="text-[#c5a059] text-[10px] tracking-[0.3em] uppercase font-bold mb-4 block">
                                {product.category?.name || "Signature Collection"}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif text-[#0a0a0a] mb-4">{product.name}</h1>
                            <p className="text-2xl font-light text-stone-600 mb-8">₹{product.basePrice}</p>

                            <div className="prose prose-stone prose-sm font-light leading-relaxed text-stone-500 mb-10">
                                {product.description ? (
                                    <p>{product.description}</p>
                                ) : (
                                    <p>An exquisite piece crafted with flawless drape and uncompromising quality. Perfect for the modern woman who values quiet luxury.</p>
                                )}
                            </div>
                        </div>

                        {product.variants && product.variants.length > 0 && (
                            <div className="mb-10 space-y-6 border-t border-black/5 pt-8">
                                <h3 className="text-xs tracking-widest text-[#0a0a0a] uppercase font-semibold">Available Options</h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.filter((v: any) => v.isActive).map((variant: any, i: number) => (
                                        <div key={i} className="border border-stone-200 bg-stone-50 px-4 py-3 rounded-sm cursor-pointer hover:border-[#c5a059] transition-colors w-full sm:w-auto">
                                            <p className="text-sm font-medium text-stone-800">{variant.name}</p>
                                            <div className="flex items-center gap-3 mt-1 text-[11px] text-stone-500">
                                                {variant.color && <span>Color: {variant.color}</span>}
                                                {variant.size && <span>Size: {variant.size}</span>}
                                                <span className="font-semibold text-stone-800 ml-auto sm:ml-4">₹{variant.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto border-t border-black/5 pt-10">
                            <Link href={`https://wa.me/919876543210?text=Hello,%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(product.name)}`} target="_blank">
                                <button className="w-full bg-[#0a0a0a] text-white py-5 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#c5a059] transition-colors">
                                    Order via WhatsApp
                                </button>
                            </Link>
                            <p className="text-center text-[10px] text-stone-400 tracking-widest uppercase mt-4">Free shipping on orders over ₹2000</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
