"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
    {
        title: "Abayas",
        subtitle: "Timeless silhouettes",
        label: "01",
        description: "Luxe fabrics tailored for grace. Our abayas drape beautifully with every step — each piece a balance of modesty and refined femininity.",
        bg: "bg-[#16120e]",
        accent: "from-[#c5a059]/10",
    },
    {
        title: "Hijabs",
        subtitle: "Feather-light & effortless",
        label: "02",
        description: "Flowy premium fabrics that move with you. Everyday elegance without compromise — available in a curated range of seasonal colours.",
        bg: "bg-[#0a0c0f]",
        accent: "from-[#8b7355]/10",
    },
    {
        title: "Niqabs",
        subtitle: "Soft · Secure · Premium",
        label: "03",
        description: "Egyptian & Saudi niqabs crafted for breathability, perfect fall, and full dignity. Find your ideal fit from our signature collection.",
        bg: "bg-[#0f0e0c]",
        accent: "from-[#c5a059]/10",
    },
];

export default function CollectionHighlights() {
    return (
        <section id="collections" className="bg-[#fafaf8] w-full" style={{ padding: '8rem 0' }}>
            {/* Header */}
            <div className="text-center px-6 w-full max-w-7xl mx-auto" style={{ marginBottom: '6rem' }}>
                <span className="text-[#c5a059] text-xs tracking-[0.4em] uppercase font-semibold block mb-4">
                    The Essence
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#0a0a0a] tracking-tight">
                    Curated Collections
                </h2>
                <div className="flex items-center justify-center gap-4 mt-8">
                    <div className="h-[1px] w-12 bg-[#c5a059]/30" />
                    <div className="w-1.5 h-1.5 border border-[#c5a059]/50 rotate-45" />
                    <div className="h-[1px] w-12 bg-[#c5a059]/30" />
                </div>
            </div>

            {/* Cards grid */}
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {collections.map((item) => (
                        <div
                            key={item.title}
                            className={`group relative overflow-hidden rounded-xl ${item.bg} flex flex-col justify-between min-h-[480px]`}
                        >
                            {/* Background subtle gradient on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${item.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                            <div className="relative z-10 p-12 lg:p-16 flex flex-col h-full w-full">
                                {/* Top: number + tag */}
                                <div className="flex items-center justify-between mb-auto">
                                    <span className="text-[#c5a059]/30 text-5xl font-serif italic leading-none select-none block">
                                        {item.label}
                                    </span>
                                    <span className="text-[9px] tracking-[0.3em] uppercase text-[#c5a059]/80 font-medium border border-[#c5a059]/20 px-4 py-2 rounded-sm bg-[#c5a059]/5">
                                        Signature
                                    </span>
                                </div>

                                {/* Content placed at bottom */}
                                <div className="mt-16 block">
                                    <h3 className="text-3xl font-serif text-white mb-3 group-hover:text-[#e2c58a] transition-colors duration-500">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs tracking-[0.2em] uppercase text-stone-400 italic mb-6 block">
                                        {item.subtitle}
                                    </p>
                                    <p className="text-stone-300 text-sm font-light leading-relaxed mb-10 block">
                                        {item.description}
                                    </p>

                                    <Link
                                        href={`/products?category=${item.title.toLowerCase()}`}
                                        className="inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.25em] uppercase text-[#c5a059] hover:text-[#e2c58a] transition-colors group/link"
                                    >
                                        <span>Explore</span>
                                        <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#c5a059]/30 group-hover/link:border-[#e2c58a] transition-colors">
                                            <ArrowRight size={12} />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center w-full px-6 mt-20">
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center border border-stone-200 bg-white px-12 py-5 text-xs font-bold tracking-[0.2em] uppercase text-stone-800 hover:bg-stone-50 hover:border-[#c5a059] transition-all duration-300 rounded-sm shadow-md"
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
}
