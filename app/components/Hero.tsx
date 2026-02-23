"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#080808] px-6 text-center">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(197,160,89,0.15)_0%,_transparent_60%)]" />
            </div>

            {/* Inner Wrapper for safe centering */}
            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center mx-auto gap-10 my-auto py-32">
                <span className="text-[#c5a059] text-xs md:text-sm tracking-[0.5em] uppercase font-bold block">
                    The Signature Collection
                </span>

                <h1 className="text-5xl leading-[1.1] md:text-6xl lg:text-[5rem] font-serif text-white max-w-4xl block">
                    Discover the elegance of <br className="hidden md:block" /><span className="text-[#c5a059] italic font-light">modesty</span>
                </h1>

                <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-60 block my-4" />

                <p className="text-stone-300 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto block">
                    Premium Abayas, Hijabs, and Niqabs curated for the modern woman who values quiet luxury and supreme comfort. Designed to elevate your everyday.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto mt-4 gap-6">
                    <Link
                        href="/products"
                        className="w-full sm:w-auto flex items-center justify-center gap-4 gold-gradient px-12 py-5 text-xs font-bold tracking-[0.2em] uppercase text-black hover:scale-105 transition-transform duration-300 rounded-sm shadow-xl"
                    >
                        Shop Now
                        <ArrowRight size={14} />
                    </Link>
                    <Link
                        href="/about"
                        className="w-full sm:w-auto flex items-center justify-center gap-4 border border-white/20 px-12 py-5 text-xs font-semibold tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
                    >
                        Our Story
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-70 animate-pulse-slow">
                <span className="text-[#c5a059] text-[10px] tracking-[0.4em] uppercase font-bold">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-[#c5a059] to-transparent" />
            </div>
        </section>
    );
}
