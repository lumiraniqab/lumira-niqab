"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isDarkPage = pathname !== "/"; // Add logic if some pages use white nav differently

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const ctx = gsap.context(() => {
            const navTl = gsap.timeline({
                paused: true,
                defaults: { duration: 0.4, ease: "power2.out" }
            });

            navTl.to(navRef.current, {
                height: "70px",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            })
                .to(".nav-logo", { color: "#0a0a0a" }, 0)
                .to(".nav-link", { color: "#0a0a0a" }, 0)
                .to(".burger-icon", { color: "#0a0a0a" }, 0);

            ScrollTrigger.create({
                start: "top top",
                onUpdate: (self) => {
                    const currentScrollY = self.scroll();
                    if (currentScrollY > 50) {
                        navTl.play();
                    } else if (pathname === "/") {
                        navTl.reverse();
                    }
                    lastScrollY = currentScrollY;
                },
            });

            // Force play if not on home page
            if (pathname !== "/") {
                navTl.progress(1);
            }
        }, navRef);

        return () => ctx.revert();
    }, [pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isMenuOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 z-50 flex h-[90px] w-full items-center justify-between px-6 transition-all duration-300 md:px-12 xl:px-20"
            >
                {/* Brand */}
                <Link href="/" className="nav-logo text-xl md:text-2xl font-serif tracking-[0.2em] text-white z-[60]">
                    LUMIRA
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-10 md:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`nav-link text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${pathname === item.href ? "text-[#c5a059]" : "text-white hover:text-[#c5a059]"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="https://wa.me/919876543210"
                        target="_blank"
                        className="gold-gradient px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black shadow-lg hover:shadow-xl transition-all rounded-sm"
                    >
                        Order Now
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="nav-link burger-icon z-[60] block md:hidden text-white"
                >
                    {isMenuOpen ? <X size={24} className="text-[#0a0a0a]" /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    } flex flex-col justify-center px-10`}
            >
                <div className="flex flex-col gap-8">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            onClick={() => setIsMenuOpen(false)}
                            href={item.href}
                            className={`text-3xl font-serif tracking-[0.1em] transition-colors ${pathname === item.href ? "text-[#c5a059]" : "text-[#0a0a0a] hover:text-[#c5a059]"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="https://wa.me/919876543210"
                        onClick={() => setIsMenuOpen(false)}
                        target="_blank"
                        className="mt-4 border border-[#c5a059] px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#c5a059] text-center hover:bg-[#c5a059] hover:text-white transition-all w-full md:w-auto"
                    >
                        WhatsApp Order
                    </Link>
                </div>
            </div>
        </>
    );
}
