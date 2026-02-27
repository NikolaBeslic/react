import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import SocialLink from "../../data/social/SocialLink.json";
import Image from "next/legacy/image";

const OffcanvasMenu = ({ ofcshow, setOfcShow, ofcHandleClose }) => {
    const router = useRouter();

    useEffect(() => {
        const closeOnRoute = () => setOfcShow(false);
        router.events.on("routeChangeComplete", closeOnRoute);
        return () => router.events.off("routeChangeComplete", closeOnRoute);
    }, [router.events, setOfcShow]);

    return (
        <Offcanvas
            show={ofcshow}
            onHide={ofcHandleClose}
            placement="end"
            className="offcanvas-menu"
            container={() => document.querySelector(".user-layout")}
        >
            <Offcanvas.Header
                closeButton
                className="close-offcanvasmeu offcanvasmenu-header"
            ></Offcanvas.Header>
            <Offcanvas.Body className="offcanvasmenu-body">
                <div className="side-nav">
                    <div className="side-nav-inner nicescroll-container">
                        <div className="side-nav-content">
                            <div className="row ">
                                <div
                                    className="col-lg-6 col-sm-6"
                                    id="offCanvas-links-from-navbar"
                                >
                                    <ul className="main-navigation side-navigation list-inline flex-column">
                                        <li className="offcanvasmenu-subheader">
                                            Čitaj / slušaj
                                        </li>
                                        <li key="off-100">
                                            <Link href="/vesti">Vesti</Link>
                                        </li>
                                        <li key="off-101">
                                            <Link href="/intervjui">
                                                Intervjui
                                            </Link>

                                            <ul className="offcanvas-intervju-submenu">
                                                <li key="off-1011">
                                                    <Link href="/hupikon">
                                                        HuPikon
                                                    </Link>
                                                </li>
                                                <li key="off-1012">
                                                    <Link href="/na-kafi">
                                                        Na kafi sa
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li key="off-102">
                                            <Link href="/recenzije">
                                                Recenzije
                                            </Link>
                                        </li>
                                        <li key="off-106">
                                            <Link href="/hupkast">HuPkast</Link>
                                        </li>

                                        <li key="off-111">
                                            <Link href="/blog">Blog</Link>
                                        </li>
                                        <li id="offcanvasmenu-patreon">
                                            <Link
                                                href="https://www.patreon.com/hocupozoriste"
                                                target="_blank"
                                            >
                                                Podržite nas
                                            </Link>
                                        </li>
                                    </ul>
                                    {/* End of .main-navigation */}
                                </div>

                                <div className="col-lg-6 col-sm-6">
                                    <ul className="main-navigation side-navigation list-inline flex-column">
                                        <li className="offcanvasmenu-subheader">
                                            Pozorišni vodič
                                        </li>
                                        <li key="off-109">
                                            <Link href="/repertoari-v2">
                                                Repertoari
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/predstave">
                                                Predstave
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pozorista">
                                                Pozorišta
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/festivali">
                                                Festivali
                                            </Link>
                                        </li>
                                    </ul>
                                    {/* End of .main-navigation */}
                                </div>
                                {/* End of  .col-md-6 */}
                                <div className="col-lg-6">
                                    <div className="axil-contact-info-inner">
                                        <h5 className="h5 m-b-xs-10">
                                            Impresum
                                        </h5>
                                        <div className="axil-contact-info">
                                            <p>
                                                Hoću (u) pozorište je portal
                                                namenjen promociji svih vidova
                                                pozorišnih delovanja, od
                                                amaterskih pozorišta do najvećih
                                                scena u Srbiji.
                                            </p>
                                            <div className="h5 m-b-xs-5">
                                                Kontakt
                                            </div>
                                            <div>
                                                <a
                                                    className="email"
                                                    href="mailto:kontakt@hocupozoriste.rs"
                                                >
                                                    <i className="fa-solid fa-envelope"></i>{" "}
                                                    <span>
                                                        kontakt@hocupozoriste.rs
                                                    </span>
                                                </a>
                                            </div>
                                            <div>
                                                <a
                                                    className="web"
                                                    href="https://hocupozoriste.rs"
                                                >
                                                    <i className="fa-solid fa-globe"></i>{" "}
                                                    <span>
                                                        www.hocupozoriste.rs
                                                    </span>
                                                </a>
                                            </div>

                                            <div className="contact-social-share m-t-xs-30">
                                                <div className="axil-social-title h5">
                                                    Pratite nas
                                                </div>
                                                <ul className="social-share social-share__with-bg">
                                                    <li>
                                                        <a
                                                            href={
                                                                SocialLink.fb
                                                                    .url
                                                            }
                                                        >
                                                            <i
                                                                className={
                                                                    SocialLink
                                                                        .fb.icon
                                                                }
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href={
                                                                SocialLink
                                                                    .instagram
                                                                    .url
                                                            }
                                                        >
                                                            <i
                                                                className={
                                                                    SocialLink
                                                                        .instagram
                                                                        .icon
                                                                }
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href={
                                                                SocialLink.yt
                                                                    .url
                                                            }
                                                        >
                                                            <i
                                                                className={
                                                                    SocialLink
                                                                        .yt.icon
                                                                }
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href={
                                                                SocialLink
                                                                    .spotify.url
                                                            }
                                                        >
                                                            <i
                                                                className={
                                                                    SocialLink
                                                                        .spotify
                                                                        .icon
                                                                }
                                                            />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* End of .contact-shsdf */}
                                        </div>
                                        {/* End of .axil-contact-info */}
                                    </div>
                                </div>
                                {/* End of .axil-contact-info-inner */}
                            </div>
                            {/* End of .row */}
                        </div>
                    </div>
                    {/* End of .side-nav-inner */}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OffcanvasMenu;
