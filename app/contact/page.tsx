import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Instagram, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Contact Us | LUMIRA",
    description: "Get in touch for orders, custom sizing, and inquiries.",
};

export default function Contact() {
    return (
        <main className="min-h-screen bg-[#fafaf8] pt-28 pb-20">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#c5a059] text-[10px] tracking-[0.4em] uppercase font-semibold block mb-6">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#0a0a0a] leading-[1.1] mb-8">
                        We are here to <span className="text-[#c5a059] italic font-light">assist you</span>
                    </h1>
                </div>

                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-stone-100 grid lg:grid-cols-12 w-full">

                    {/* Direct Contact Info */}
                    <div className="bg-[#080808] text-white p-8 lg:p-12 lg:col-span-5 relative overflow-hidden h-full">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/10 rounded-full blur-[80px]" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-serif mb-2">Contact & Connect</h2>
                            <p className="text-stone-400 text-sm font-light mb-12 max-w-[280px]">
                                Reach out to us for order inquiries, style advice, or bespoke sizing requests.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                        <Phone size={18} className="text-[#c5a059]" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="text-[10px] font-semibold tracking-widest uppercase mb-1">WhatsApp Orders</h3>
                                        <a href="https://wa.me/919876543210" className="text-stone-300 text-sm font-light hover:text-[#c5a059] transition-colors truncate block">
                                            +91 98765 43210
                                        </a>
                                        <p className="text-[9px] text-stone-500 mt-1">Fastest response time</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                        <Instagram size={18} className="text-[#c5a059]" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="text-[10px] font-semibold tracking-widest uppercase mb-1">Instagram</h3>
                                        <a href="https://instagram.com/lumira" className="text-stone-300 text-sm font-light hover:text-[#c5a059] transition-colors truncate block">
                                            @lumira
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                        <Mail size={18} className="text-[#c5a059]" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="text-[10px] font-semibold tracking-widest uppercase mb-1">Email</h3>
                                        <a href="mailto:hello@lumiraniqabs.com" className="text-stone-300 text-sm font-light hover:text-[#c5a059] transition-colors truncate block">
                                            hello@lumiraniqabs.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-white/10 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-stone-400 font-light">
                                    <MapPin size={16} className="text-[#c5a059] shrink-0" />
                                    <span>Shipping: All-India / Fast Dispatch</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-stone-400 font-light">
                                    <CheckCircle2 size={16} className="text-[#c5a059] shrink-0" />
                                    <span>COD: Available in select areas</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Form */}
                    <div className="p-8 lg:p-12 lg:col-span-7 flex flex-col justify-center bg-white h-full">
                        <h2 className="text-2xl font-serif text-[#0a0a0a] mb-2">Send an Inquiry</h2>
                        <p className="text-stone-500 text-sm font-light mb-8">
                            We will get back to you within 24 hours.
                        </p>

                        <form className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] text-stone-400 tracking-widest uppercase mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-[#c5a059] transition-colors bg-stone-50" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-stone-400 tracking-widest uppercase mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-[#c5a059] transition-colors bg-stone-50" />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="block text-[10px] text-stone-400 tracking-widest uppercase mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-[#c5a059] transition-colors bg-stone-50" />
                            </div>

                            <div className="pt-2">
                                <label className="block text-[10px] text-stone-400 tracking-widest uppercase mb-2">What is this regarding?</label>
                                <select className="w-full px-4 py-3 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-[#c5a059] transition-colors bg-stone-50">
                                    <option>Order Status / Tracking</option>
                                    <option>Product Inquiry</option>
                                    <option>Custom Sizing</option>
                                    <option>Returns & Exchanges</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <label className="block text-[10px] text-stone-400 tracking-widest uppercase mb-3">Message</label>
                                <textarea rows={5} className="w-full px-5 py-4 border border-stone-200 rounded-sm text-sm focus:outline-none focus:border-[#c5a059] transition-colors bg-stone-50 resize-none" />
                            </div>

                            <div className="pt-6">
                                <button type="button" className="w-full gold-gradient text-black py-5 text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:scale-[1.02] transition-transform">
                                    Submit Inquiry
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
