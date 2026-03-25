import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";

const COOKIE_CONSENT_KEY = "hup_cookie_consent";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

        if (!consent) {
            setIsVisible(true);
        }

        setIsLoaded(true);
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        setIsVisible(false);
    };

    if (!isLoaded || !isVisible) {
        return null;
    }

    return (
        <div className="cookie-banner">
            <div className="cookie-banner__content">
                <p className="cookie-banner__text">
                    <FontAwesomeIcon icon={faCookieBite} size="lg" />
                    Koristimo kolačiće da sajt radi kako treba i da unapredimo
                    vaše iskustvo. Više u{" "}
                    <Link
                        href="/politika-kolacica"
                        className="cookie-banner__link"
                    >
                        politici kolačića
                    </Link>
                    .
                </p>

                <Button
                    variant="primary"
                    className="btn btn-primary btn-small"
                    onClick={handleAccept}
                >
                    U redu
                </Button>
            </div>
        </div>
    );
}
