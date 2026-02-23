"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
    {
        name: "Saudi Single Layer",
        description: "An elegant timeless veil crafted with feather-light breathable chiffon for everyday wear.",
        price: "₹450"
    },
    {
        name: "Royal Three Layer",
        description: "Rich coverage with premium Nida fabric, crafted for a royal silhouette and formal occasions.",
        price: "₹850"
    },
    {
        name: "Egyptian Short",
        description: "A perfect balance of comfort and modesty. Classic cut, lightweight, zero compromise on opacity.",
        price: "₹550"
    }
];

export default function FeaturedNiqabs() {
    return (
        <section className="bg-[#0a0a0a] text-white w-full border-t border-white/5" style={{ padding: '8rem 0' }}>
            <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16" style={{ marginBottom: '6rem' }}>
                    <div className="max-w-xl block">
                        <span className="text-[#c5a059] text-[10px] tracking-[0.4em] uppercase font-semibold block mb-4">
                            Spotlight
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 block">
                            Featured <span className="italic text-[#c5a059] font-light">Niqabs</span>
                        </h2>
                        <p className="text-stone-400 text-sm font-light leading-relaxed block">
                            Discover our top-selling signature pieces. Designed with the finest breathable fabrics to ensure comfort and dignity throughout your day.
                        </p>
                    </div>

                    <Link
                        href="/products?category=niqab"
                        className="hidden md:flex shrink-0 items-center justify-center gap-4 border border-white/20 px-8 py-4 text-[10px] font-semibold tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
                    >
                        View All
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8 w-full">
                    {features.map((item, i) => (
                        <div key={item.name} className="group bg-[#161616] border border-white/5 p-12 lg:p-14 hover:border-[#c5a059]/30 transition-colors duration-500 rounded-lg flex flex-col w-full" style={{ minHeight: '380px' }}>
                            <div className="text-[#c5a059]/30 font-serif italic text-4xl mb-8 group-hover:text-[#c5a059]/60 transition-colors block">
                                0{i + 1}
                            </div>

                            <h3 className="text-xl font-serif text-white mb-4 group-hover:text-[#e2c58a] transition-colors block">
                                {item.name}
                            </h3>
                            <p className="text-stone-400 text-sm font-light leading-relaxed mb-10 flex-grow block">
                                {item.description}
                            </p>

                            <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto w-full">
                                <span className="text-white font-serif tracking-widest">{item.price}</span>
                                <Link
                                    href={`/products`}
                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-[#c5a059] group-hover:text-[#c5a059] group-hover:bg-[#c5a059]/10 transition-all"
                                >
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 md:hidden flex justify-center w-full">
                    <Link
                        href="/products?category=niqab"
                        className="flex w-full sm:w-auto items-center justify-center gap-4 border border-white/20 px-10 py-5 text-[10px] font-semibold tracking-[0.2em] uppercase text-white active:bg-white active:text-black transition-all rounded-sm"
                    >
                        View All
                    </Link>
                </div>

            </div>
        </section>
    );
}
