"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
    {
        quote: "Soft fabric, breathable, and perfect fit.",
        author: "Ayesha S.",
        label: "Verified Buyer"
    },
    {
        quote: "Hijab drapes beautifully, no slipping.",
        author: "Fatima R.",
        label: "Verified Buyer"
    },
    {
        quote: "Saudi Niqab is elegant and comfortable.",
        author: "Zainab M.",
        label: "Verified Buyer"
    },
    {
        quote: "Perfume lasts all day, luxury in a bottle.",
        author: "Khadija A.",
        label: "Verified Buyer"
    }
];

export default function CustomerReviews() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".review-card", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white w-full" style={{ padding: '8rem 0' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-[#c5a059] text-[10px] tracking-[0.4em] uppercase font-semibold block mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-light text-[#0a0a0a] tracking-tight">
                        Customer Reviews
                    </h2>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <div className="h-[1px] w-8 bg-[#c5a059]/30" />
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className="fill-[#c5a059] text-[#c5a059]" />
                            ))}
                        </div>
                        <div className="h-[1px] w-8 bg-[#c5a059]/30" />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {reviews.map((review, i) => (
                        <div key={i} className="review-card bg-[#fafaf8] border border-stone-200 p-10 lg:p-12 rounded-lg flex flex-col h-full hover:border-[#c5a059]/30 transition-colors duration-500">
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={12} className="fill-[#c5a059] text-[#c5a059]" />
                                ))}
                            </div>

                            <p className="text-stone-700 font-serif italic text-lg leading-relaxed mb-8 flex-grow">
                                "{review.quote}"
                            </p>

                            <div className="mt-auto border-t border-stone-200 pt-8">
                                <p className="text-[#0a0a0a] text-sm font-semibold tracking-wide uppercase mb-1">
                                    {review.author}
                                </p>
                                <p className="text-[9px] tracking-[0.2em] uppercase text-stone-500 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                                    {review.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
