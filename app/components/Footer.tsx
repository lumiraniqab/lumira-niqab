"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#080808] text-white py-20 px-6 md:px-12 border-t border-[#c5a059]/20">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                {/* Brand */}
                <div className="flex flex-col gap-6 lg:pr-8">
                    <Link href="/" className="text-2xl font-serif tracking-[0.2em] text-white">
                        LUMIRA
                    </Link>
                    <p className="text-stone-400 text-sm font-light leading-relaxed">
                        Premium modest wear crafted with intention — where tradition meets contemporary elegance.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="https://instagram.com/lumira"
                            target="_blank"
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-stone-400 hover:text-[#c5a059] hover:border-[#c5a059] transition-all"
                        >
                            <Instagram size={16} />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-semibold mb-6">Navigation</h3>
                    <ul className="flex flex-col gap-4">
                        {["Home", "Shop", "About", "Contact"].map((item) => (
                            <li key={item}>
                                <Link
                                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    className="text-stone-400 text-sm font-light hover:text-white transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact & Connect */}
                <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-semibold mb-6">Contact & Connect</h3>
                    <ul className="flex flex-col gap-4 text-sm font-light text-stone-400">
                        <li>
                            <Link href="https://wa.me/919876543210" className="flex items-center gap-3 hover:text-[#c5a059] transition-colors">
                                <Phone size={14} className="text-[#c5a059]/50" />
                                WhatsApp: +91 98765 43210
                            </Link>
                        </li>
                        <li>
                            <Link href="mailto:hello@lumira.com" className="flex items-center gap-3 hover:text-[#c5a059] transition-colors">
                                <Mail size={14} className="text-[#c5a059]/50" />
                                hello@lumira.com
                            </Link>
                        </li>
                        <li className="flex items-center gap-3">
                            <Instagram size={14} className="text-[#c5a059]/50" />
                            @lumira
                        </li>
                    </ul>
                </div>

                {/* Shipping & Policies */}
                <div>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-semibold mb-6">Shipping & Info</h3>
                    <ul className="flex flex-col gap-4 text-sm font-light text-stone-400">
                        <li className="flex items-center gap-3">
                            <MapPin size={14} className="text-[#c5a059]/50" />
                            All-India / Fast Dispatch
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 size={14} className="text-[#c5a059]/50" />
                            COD: Available in select areas
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase text-stone-500">
                <p>&copy; {new Date().getFullYear()} Lumira Niqabs. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <Link href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
