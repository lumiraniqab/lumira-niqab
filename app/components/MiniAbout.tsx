"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function MiniAbout() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-fade", {
                opacity: 0, y: 35, duration: 1, stagger: 0.15, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="bg-[#fafaf8] w-full border-t border-black/5" style={{ padding: '8rem 0' }}>
            <div className="mx-auto max-w-3xl px-6 md:px-12 text-center">

                <span className="about-fade text-[#c5a059] text-[9px] tracking-[0.5em] uppercase font-semibold block mb-6">
                    Who We Are
                </span>

                <h2 className="about-fade text-3xl md:text-5xl font-serif font-light text-[#0a0a0a] tracking-tight mb-8">
                    About Lumira Niqabs
                </h2>

                {/* Divider */}
                <div className="about-fade flex justify-center items-center gap-3 mb-10">
                    <div className="w-16 h-px bg-[#c5a059]/20" />
                    <div className="w-1.5 h-1.5 border border-[#c5a059]/30 rotate-45" />
                    <div className="w-16 h-px bg-[#c5a059]/20" />
                </div>

                {/* Quote */}
                <blockquote className="about-fade relative mb-12">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-[#c5a059]/10 font-serif leading-none select-none">&ldquo;</span>
                    <p className="text-lg md:text-xl font-serif italic text-stone-500 leading-relaxed md:px-4">
                        Lumira Niqabs brings you premium quality niqabs designed for comfort,
                        style, and modesty. Our collection is crafted to blend tradition
                        with contemporary elegance.
                    </p>
                </blockquote>

                {/* Stats */}
                <div className="about-fade grid grid-cols-3 gap-6 md:gap-12 py-12 border-y border-black/[0.06] mb-14">
                    {[
                        { value: "100+", label: "Premium Styles" },
                        { value: "4.9★", label: "Average Rating" },
                        { value: "5K+", label: "Happy Customers" },
                    ].map(stat => (
                        <div key={stat.label} className="flex flex-col items-center gap-1">
                            <span className="text-xl md:text-2xl font-serif font-light text-[#0a0a0a]">{stat.value}</span>
                            <span className="text-[8px] tracking-[0.35em] uppercase text-stone-400 font-medium">{stat.label}</span>
                        </div>
                    ))}
                </div>

                <div className="about-fade">
                    <Link
                        href="#collections"
                        className="inline-block gold-gradient px-12 py-4 text-[10px] font-bold tracking-[0.35em] uppercase text-black hover:scale-105 active:scale-95 transition-transform shadow-[0_6px_24px_rgba(197,160,89,0.2)]"
                    >
                        Explore Collection
                    </Link>
                </div>
            </div>
        </section>
    );
}
