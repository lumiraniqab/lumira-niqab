"use client";

const pillars = [
    {
        title: "Breathable Fabrics",
        description: "Sourced globally, our Nida and Chiffon materials ensure maximum airflow without compromising opacity.",
        number: "01"
    },
    {
        title: "Flawless Drape",
        description: "Tailored to move with elegance. Every piece is cut to provide a royal silhouette that stands the test of time.",
        number: "02"
    },
    {
        title: "Zero Compromise",
        description: "We believe modesty should never feel restrictive. Experience true freedom and comfort in your everyday wear.",
        number: "03"
    },
];

export default function Experience() {
    return (
        <section className="bg-white w-full border-t border-stone-100" style={{ padding: '8rem 0' }}>
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">

                {/* Header Area */}
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24" style={{ marginBottom: '6rem' }}>
                    <div className="block">
                        <span className="text-[#c5a059] text-xs tracking-[0.4em] uppercase font-semibold block mb-6">
                            The Philosophy
                        </span>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#0a0a0a] leading-[1.1]">
                            Modesty<br />
                            <span className="italic text-stone-500">is a lifestyle.</span>
                        </h2>
                    </div>

                    <div className="flex items-center border-l border-stone-200 pl-8 md:pl-16">
                        <p className="text-stone-500 text-xl font-serif italic leading-relaxed">
                            &ldquo;We believe modesty is a lifestyle of confidence, comfort, and quiet luxury — never a compromise.&rdquo;
                        </p>
                    </div>
                </div>

                {/* Pillars Grid */}
                <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
                    {pillars.map((pillar) => (
                        <div key={pillar.title} className="relative pt-16 border-t border-stone-200 block">
                            <span className="absolute -top-4 left-0 bg-white pr-6 text-[#c5a059] text-sm font-bold tracking-[0.2em] block">
                                {pillar.number}
                            </span>
                            <h3 className="text-2xl font-serif text-[#0a0a0a] mb-6 block">
                                {pillar.title}
                            </h3>
                            <p className="text-stone-500 text-base font-light leading-loose block">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
