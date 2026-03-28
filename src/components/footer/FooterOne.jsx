import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";

const FooterOne = () => {
    return (
        <footer className="page-footer bg-grey-dark-key">
            <div className="container">
                <div className="footer-top">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">
                                    Predstave
                                </h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link
                                            href="/predstave?sort=komentari"
                                            prefetch={false}
                                        >
                                            Predstave sa najviše komentara
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/predstave?hasReviews=1"
                                            prefetch={false}
                                        >
                                            Predstave o kojima smo pisali
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/predstave?sort=rating_desc"
                                            prefetch={false}
                                        >
                                            Najbolje ocenjene
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/predstave?gradovi=1&zanrovi=3"
                                            prefetch={false}
                                        >
                                            Opere u Beogradu
                                        </Link>
                                    </li>
                                </ul>
                                {/* End of .footer-nav */}
                            </div>
                            {/* End of .footer-widget */}
                        </div>
                        {/* End of .col-lg-2 */}
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">
                                    Na repertoaru
                                </h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link
                                            href="/repertoari?zanrovi=2&datumi=today"
                                            prefetch={false}
                                        >
                                            Komedije danas
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/repertoari?zanrovi=6&datumi=week"
                                            prefetch={false}
                                        >
                                            Predstave za decu ove nedelje
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/repertoari?zanrovi=1&datumi=today"
                                            prefetch={false}
                                        >
                                            Drame večeras
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/repertoari?zanrovi=5&datumi=month"
                                            prefetch={false}
                                        >
                                            Mjuzikli ovog meseca
                                        </Link>
                                    </li>
                                </ul>
                                {/* End of .footer-nav */}
                            </div>
                            {/* End of .footer-widget */}
                        </div>
                        {/* End of .col-lg-2 */}
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">
                                    Festivali
                                </h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link
                                            href="/festivali/70-sterijino-pozorje"
                                            prefetch={false}
                                        >
                                            Sterijino pozorje
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/festivali/ne-bitef-2025"
                                            prefetch={false}
                                        >
                                            Bitef
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/festivali/33-pozorisni-maraton"
                                            prefetch={false}
                                        >
                                            Pozorišni maraton Sombor
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/festivali/21-urban-fest"
                                            prefetch={false}
                                        >
                                            Urban fest Niš
                                        </Link>
                                    </li>
                                </ul>
                                {/* End of .footer-nav */}
                            </div>
                            {/* End of .footer-widget */}
                        </div>
                        {/* End of .col-lg-2 */}
                        <div className="col-lg-3 col-md-4 col-6">
                            <div className="footer-widget">
                                <h2 className="footer-widget-title">
                                    Hoću u pozorište
                                </h2>
                                <ul className="footer-nav">
                                    <li>
                                        <Link
                                            href="https://www.patreon.com/hocupozoriste"
                                            target="_blank"
                                            rel="noreferrer"
                                            prefetch={false}
                                        >
                                            Podržite nas na Patreonu
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/o-nama" prefetch={false}>
                                            O nama
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/redakcija"
                                            prefetch={false}
                                        >
                                            Redakcija
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/kontakt" prefetch={false}>
                                            Kontakt
                                        </Link>
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
                                        src="/images/hup-logo.png"
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
                                        Pratite nas
                                    </div>
                                    <ul className="social-share social-share__with-bg">
                                        <li>
                                            <a
                                                href={SocialLink.fb.url}
                                                title="Hoću u pozorište na Facebooku"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i
                                                    className={
                                                        SocialLink.fb.icon
                                                    }
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={SocialLink.instagram.url}
                                                title="hocupozoriste na Instagramu"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i
                                                    className={
                                                        SocialLink.instagram
                                                            .icon
                                                    }
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={SocialLink.yt.url}
                                                title="YouTube kanal Hoću u pozorište"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i
                                                    className={
                                                        SocialLink.yt.icon
                                                    }
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={SocialLink.spotify.url}
                                                title="HuPkast na Spotify-u"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i
                                                    className={
                                                        SocialLink.spotify.icon
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
                            <Link href="/o-nama" prefetch={false}>
                                Impressum
                            </Link>
                        </li>
                        <li>
                            <Link href="/politika-privatnosti" prefetch={false}>
                                Politika privatnosti
                            </Link>
                        </li>
                        <li>
                            <Link href="/uslovi-koriscenja" prefetch={false}>
                                Uslovi korišćenja
                            </Link>
                        </li>
                    </ul>
                    {/* End of .footer-bottom-links */}
                    <p className="axil-copyright-txt">
                        © 2017 - {new Date().getFullYear()}. Sva prava zadržava
                        Hoću u pozorište.
                    </p>
                </div>
                {/* End of .footer-bottom */}
            </div>
            {/* End of .container */}
        </footer>
    );
};

export default FooterOne;
