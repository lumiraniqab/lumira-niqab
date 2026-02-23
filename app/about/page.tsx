import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export const metadata = {
    title: "About Us | LUMIRA",
    description: "Our story, heritage, and philosophy behind the premium modest wear.",
};

export default function About() {
    return (
        <main className="min-h-screen bg-white pt-24">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 md:py-24">

                {/* Header */}
                <div className="text-center mb-20 md:mb-32">
                    <span className="text-[#c5a059] text-[10px] tracking-[0.4em] uppercase font-semibold block mb-6">
                        Heritage & Legacy
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#0a0a0a] leading-[1.1] mb-8">
                        The Story of <span className="text-[#c5a059] italic font-light">LUMIRA</span>
                    </h1>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto opacity-60" />
                </div>

                {/* Content Sections */}
                <div className="space-y-24 md:space-y-32">

                    <section className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="space-y-6 text-stone-600 font-light leading-relaxed">
                            <h2 className="text-2xl font-serif text-[#0a0a0a] mb-8">Where Modesty Meets Luxury</h2>
                            <p>
                                Lumira Niqabs was founded on a simple yet profound premise: modest wear should never be a compromise. For too long, the search for the perfect abaya or niqab meant sacrificing either breathability for opacity, or elegance for comfort.
                            </p>
                            <p>
                                We stepped in to bridge that gap. Every piece in our collection is meticulously crafted to offer women a wardrobe that sits seamlessly at the intersection of tradition and contemporary luxury.
                            </p>
                        </div>
                        <div className="relative aspect-[4/5] bg-stone-100 rounded-sm overflow-hidden">
                            <div className="absolute inset-0 bg-[#080808] flex items-center justify-center">
                                <span className="text-[#c5a059] font-serif italic text-2xl tracking-widest opacity-50">LUMIRA</span>
                            </div>
                        </div>
                    </section>

                    <section className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center md:flex-row-reverse">
                        <div className="relative aspect-[4/5] bg-stone-100 rounded-sm overflow-hidden md:order-2">
                            <div className="absolute inset-0 bg-[#080808] flex items-center justify-center">
                                <span className="text-[#c5a059] font-serif italic text-2xl tracking-widest opacity-50">CRAFT</span>
                            </div>
                        </div>
                        <div className="space-y-6 text-stone-600 font-light leading-relaxed md:order-1">
                            <h2 className="text-2xl font-serif text-[#0a0a0a] mb-8">The Art of Craftsmanship</h2>
                            <p>
                                Quality is woven into our DNA. We source our sheer Chiffon from the finest mills and our premium Nida directly from Dubai. We do not mass produce; instead, we curate.
                            </p>
                            <p>
                                From the precisely tailored draping of our three-layer Saudi Niqabs to the reinforced stitching on our everyday wear, we ensure that what you wear feels just as beautiful as it looks.
                            </p>
                        </div>
                    </section>

                    <section className="text-center max-w-2xl mx-auto pt-12 border-t border-stone-200">
                        <h2 className="text-2xl font-serif text-[#0a0a0a] mb-6">Our Promise</h2>
                        <p className="text-stone-600 font-light leading-relaxed italic text-lg">
                            "To elevate the everyday experience of the modest woman, granting her the dignity she deserves through garments that reflect her inner grace."
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
