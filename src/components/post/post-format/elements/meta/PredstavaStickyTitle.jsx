import { useEffect, useRef, useState } from "react";

const PredstavaStickyTitle = ({
    posterUrl,
    title,
    avgRating, // number like 9.2
    ratingCount, // number like 20
    heroSelector = "#predstava-hero", // id of your big hero section
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isCompact, setIsCompact] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const heroEl = document.querySelector(heroSelector);
        if (!heroEl) return;

        const update = () => {
            const heroRect = heroEl.getBoundingClientRect();

            // Show sticky strip once hero is mostly out of view (top passed)
            const shouldShow = heroRect.bottom <= 80; // 80px buffer
            setIsVisible(shouldShow);

            // Small “compact” feel when user scrolls down further
            const y = window.scrollY || 0;
            setIsCompact(y > 450);

            lastScrollY.current = y;
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [heroSelector]);

    return (
        <div
            className={[
                "predstava-sticky",
                isVisible ? "is-visible" : "",
                isCompact ? "is-compact" : "",
            ].join(" ")}
            aria-hidden={!isVisible}
        >
            <div className="container">
                <div className="predstava-sticky-inner">
                    <div className="predstava-sticky-left">
                        <div className="predstava-sticky-poster">
                            <img
                                src={posterUrl || "/slike/vizitke-cover.jpg"}
                                alt={title}
                            />
                        </div>

                        <div className="predstava-sticky-text">
                            <div
                                className="predstava-sticky-title"
                                title={title}
                            >
                                {title}
                            </div>

                            <div className="predstava-sticky-rating">
                                <span className="predstava-sticky-rating-num">
                                    {typeof avgRating === "number"
                                        ? avgRating.toFixed(1)
                                        : "—"}
                                </span>
                                <span className="predstava-sticky-rating-den">
                                    /10
                                </span>
                                <span className="predstava-sticky-rating-count">
                                    ({ratingCount ?? 0})
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="predstava-sticky-right">
                        {/* Optional: anchors to sections */}
                        <a className="predstava-sticky-link" href="#opis">
                            Opis
                        </a>
                        <a className="predstava-sticky-link" href="#tekstovi">
                            Tekstovi
                        </a>
                        <a className="predstava-sticky-link" href="#uloge">
                            Uloge
                        </a>
                        <a className="predstava-sticky-link" href="#komentari">
                            Komentari
                        </a>
                        <a className="predstava-sticky-link" href="#izvodjenja">
                            Izvođenja
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredstavaStickyTitle;
