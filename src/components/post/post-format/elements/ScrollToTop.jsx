import { useState, useEffect } from "react";
import styles from "./scrollToTopButton.module.css";

function ScrollToTopButton() {
    const [showButton, setShowButton] = useState("false");

    useEffect(() => {
        const handleScrollToTopButtonVisiblity = () => {
            window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
        };
        window.addEventListener("scroll", handleScrollToTopButtonVisiblity);
        return () => {
            window.removeEventListener("scroll", handleScrollToTopButtonVisiblity);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {showButton && (
                <div className="scrollToTop">
                    <a
                        className={styles.scrollToTop__button}
                        onClick={handleScrollToTop}
                    />
                </div>
            )}
        </>
    );
}

export default ScrollToTopButton;