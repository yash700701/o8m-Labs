"use client";

import { useEffect, useMemo, useState } from "react";

export default function HeroSlider({ slides }) {
    const activeSlides = useMemo(
        () => slides.filter((slide) => slide.is_active !== false),
        [slides]
    );
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (activeSlides.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % activeSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [activeSlides.length]);

    if (!activeSlides.length) return null;

    const slide = activeSlides[index];

    return (
        <section className="hero">
            <div className="hero__media ">
                {slide.media_type === "video" ? (
                    <video
                        src={slide.media_url}
                        className="hero__media-item"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <img
                        src={slide.media_url}
                        alt={slide.title}
                        className="hero__media-item"
                        loading="lazy"
                    />
                )}
                <div className="hero__scrim" />
            </div>

            <div className="hero__content flex flex-col items-start justify-baseline">
                <p className="hero__eyebrow">Giakaa-inspired intelligence</p>
                <h1 >{slide.title}</h1>
                <p className="hero__sub mb-2">{slide.description}</p>
                {slide.cta_text && (
                    <a className="bg-white text-zinc-600 px-5 rounded-full " href={slide.cta_link}>
                        {slide.cta_text}
                    </a>
                )}

                <div className="hero__controls">
                    {activeSlides.map((_, i) => (
                        <button
                            key={i}
                            className={
                                i === index
                                    ? "hero__dot hero__dot--active"
                                    : "hero__dot"
                            }
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
