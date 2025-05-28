import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";

const FooterOne = () => {
    return (
        <footer className="page-footer bg-grey-dark-key">
            <div className="container">
                <div className="footer-top">
                    <div className="row">
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">
                                    Predstave
                                </h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link
                                            href={{
                                                pathname: "/predstave",
                                                query: { zanr: "komedija" },
                                            }}
                                        >
                                            Komedije
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={{
                                                pathname: "/predstave",
                                                query: { zanr: "drama" },
                                            }}
                                        >
                                            Drame
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={{
                                                pathname: "/predstave",
                                                query: {
                                                    zanr: "predstava za decu",
                                                },
                                            }}
                                        >
                                            Predstave za decu
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={{
                                                pathname: "/predstave",
                                                query: { zanr: "opera" },
                                            }}
                                        >
                                            Opere
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={{
                                                pathname: "/predstave",
                                                query: { zanr: "balet" },
                                            }}
                                        >
                                            Baleti
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={{
                                                pathname: "/predstave",
                                                query: { zanr: "mjuzikl" },
                                            }}
                                        >
                                            Mjuzikli
                                        </Link>
                                    </li>
                                </ul>
                                {/* End of .footer-nav */}
                            </div>
                            {/* End of .footer-widget */}
                        </div>
                        {/* End of .col-lg-2 */}
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">
                                    Repertoari
                                </h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link href="/">
                                            Nove predstave Beograd
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            Najbolje ocenjene predstave
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">Najviše komentara</Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            Najpopularnije predstave
                                        </Link>
                                    </li>
                                </ul>
                                {/* End of .footer-nav */}
                            </div>
                            {/* End of .footer-widget */}
                        </div>
                        {/* End of .col-lg-2 */}
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">
                                    Pozorišta
                                </h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link href="/">
                                            Dečija pozorišta Niš
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            Studentska pozorišta
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            Pozorišta u Subotici
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            Nezavisna pozorišta Beograd
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">Opera Novi Sad</Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            Pozorišta Zrenjanin
                                        </Link>
                                    </li>
                                </ul>
                                {/* End of .footer-nav */}
                            </div>
                            {/* End of .footer-widget */}
                        </div>
                        {/* End of .col-lg-2 */}
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">
                                    Festivali
                                </h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link href="/">Sterijino pozorje</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Bitef</Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            Pozorišni maraton Sombor
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            Borini pozorišni dani
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">Joakim Interfest</Link>
                                    </li>
                                </ul>
                                {/* End of .footer-nav */}
                            </div>
                            {/* End of .footer-widget */}
                        </div>
                        {/* End of .col-lg-2 */}
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">
                                    Hoću u pozorište
                                </h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link href="/">HuPkast</Link>
                                    </li>
                                    <li>
                                        <Link href="/">HuPikon</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Blog</Link>
                                    </li>
                                    <li>
                                        <Link href="/">O nama</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Kontakt</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Redakcija</Link>
                                    </li>
                                </ul>
                                {/* End of .footer-nav */}
                            </div>
                            {/* End of .footer-widget */}
                        </div>
                        {/* End of .col-lg-2 */}
                        <div className="col-lg-2 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">About</h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link href="/">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Careers</Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            Fox Around the World
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">Advertise With Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Ad Choices</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Media Relations</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Compliance</Link>
                                    </li>
                                </ul>
                                {/* End of .footer-nav */}
                            </div>
                            {/* End of .footer-widget */}
                        </div>
                        {/* End of .col-lg-2 */}
                    </div>
                    {/* End of .row */}
                </div>
                {/* End of .footer-top */}
                <div className="footer-mid">
                    <div className="row align-items-center">
                        <div className="col-md">
                            <div className="footer-logo-container">
                                <Link href="/" legacyBehavior>
                                    <Image
                                        src="/images/logo-symbol.svg"
                                        alt="footer logo"
                                        className="footer-logo"
                                        width={86}
                                        height={28}
                                    />
                                </Link>
                            </div>
                            {/* End of .brand-logo-container */}
                        </div>
                        {/* End of .col-md-6 */}
                        <div className="col-md-auto">
                            <div className="footer-social-share-wrapper">
                                <div className="footer-social-share">
                                    <div className="axil-social-title">
                                        Find us here
                                    </div>
                                    <ul className="social-share social-share__with-bg">
                                        <li>
                                            <a href={SocialLink.fb.url}>
                                                <i
                                                    className={
                                                        SocialLink.fb.icon
                                                    }
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={SocialLink.twitter.url}>
                                                <i
                                                    className={
                                                        SocialLink.twitter.icon
                                                    }
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={SocialLink.yt.url}>
                                                <i
                                                    className={
                                                        SocialLink.yt.icon
                                                    }
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={SocialLink.linked.url}>
                                                <i
                                                    className={
                                                        SocialLink.linked.icon
                                                    }
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={SocialLink.pinterest.url}>
                                                <i
                                                    className={
                                                        SocialLink.pinterest
                                                            .icon
                                                    }
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* End of .footer-social-share-wrapper */}
                        </div>
                        {/* End of .col-md-6 */}
                    </div>
                    {/* End of .row */}
                </div>
                {/* End of .footer-mid */}
                <div className="footer-bottom">
                    <ul className="footer-bottom-links">
                        <li>
                            <Link href="/">Terms of Use</Link>
                        </li>
                        <li>
                            <Link href="/">Accessibility &amp; CC</Link>
                        </li>
                        <li>
                            <Link href="/">AdChoices</Link>
                        </li>
                        <li>
                            <Link href="/">Modern Slavery Act Statement</Link>
                        </li>
                        <li>
                            <Link href="/">Advertise with us</Link>
                        </li>
                        <li>
                            <Link href="/">Papr Store</Link>
                        </li>
                        <li>
                            <Link href="/">Newsletters</Link>
                        </li>
                        <li>
                            <Link href="/">Transcripts</Link>
                        </li>
                        <li>
                            <Link href="/">License Footage</Link>
                        </li>
                        <li>
                            <Link href="/">Sitemap</Link>
                        </li>
                    </ul>
                    {/* End of .footer-bottom-links */}
                    <p className="axil-copyright-txt">
                        © {new Date().getFullYear()}. All rights reserved by
                        Your Company.
                    </p>
                </div>
                {/* End of .footer-bottom */}
            </div>
            {/* End of .container */}
        </footer>
    );
};

export default FooterOne;
