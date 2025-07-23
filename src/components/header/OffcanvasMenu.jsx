import Link from "next/link";
import Offcanvas from "react-bootstrap/Offcanvas";
import SocialLink from "../../data/social/SocialLink.json";
import Image from "next/legacy/image";

const OffcanvasMenu = ({ ofcshow, ofcHandleClose }) => {
    return (
        <Offcanvas
            show={ofcshow}
            onHide={ofcHandleClose}
            placement="end"
            className="offcanvas-menu"
        >
            <Offcanvas.Header
                closeButton
                className="close-offcanvasmeu"
            ></Offcanvas.Header>
            <div className="side-nav">
                <div className="side-nav-inner nicescroll-container">
                    <div className="form-group search-field">
                        <Image
                            src="/images/hup-logo.png"
                            alt="brand-logo"
                            width={180}
                            height={50}
                        />
                    </div>
                    <div className="side-nav-content">
                        <ul className="m-b-xs-50 list-inline justify-content-between align-items-center sidemenu-horizontal-list">
                            <li className="sidemenu-list-item">
                                <Link href="/predstave">Predstave</Link>
                            </li>
                            <li className="sidemenu-list-item">
                                <Link href="/repertoari-v2">Repertoari</Link>
                            </li>
                            <li className="sidemenu-list-item">
                                <Link href="/pozorista">Pozorišta</Link>
                            </li>
                            <li className="sidemenu-list-item">
                                <Link href="/festivali">Festivali</Link>
                            </li>
                        </ul>
                        <hr />
                        <div className="row ">
                            <div className="col-lg-6">
                                <ul className="main-navigation side-navigation list-inline flex-column">
                                    <li>
                                        <Link href="/vesti">Vesti</Link>
                                    </li>
                                    <li>
                                        <Link href="/intervjui">Intervjui</Link>
                                    </li>
                                    <li>
                                        <Link href="/recenzije">Recenzije</Link>
                                    </li>
                                    <li>
                                        <Link href="/hupkast">HuPkast</Link>
                                    </li>
                                    <li>
                                        <Link href="/#">Blog</Link>
                                    </li>
                                </ul>
                                {/* End of .main-navigation */}
                            </div>
                            {/* End of  .col-md-6 */}
                            <div className="col-lg-6">
                                <div className="axil-contact-info-inner">
                                    <h5 className="h5 m-b-xs-10">Impresum</h5>
                                    <div className="axil-contact-info">
                                        <p>
                                            Hoću (u) pozorište je portal
                                            namenjen promociji svih vidova
                                            pozorišnih delovanja, od amaterskih
                                            pozorišta do najvećih scena u
                                            Srbiji.
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
                                                kontakt@hocupozoriste.rs
                                            </a>
                                        </div>
                                        <div>
                                            <a
                                                className="web"
                                                href="https://hocupozoriste.rs"
                                            >
                                                <i className="fa-solid fa-globe"></i>{" "}
                                                www.hocupozoriste.rs
                                            </a>
                                        </div>

                                        <div className="contact-social-share m-t-xs-30">
                                            <div className="axil-social-title h5">
                                                Pratite nas
                                            </div>
                                            <ul className="social-share social-share__with-bg">
                                                <li>
                                                    <a href={SocialLink.fb.url}>
                                                        <i
                                                            className={
                                                                SocialLink.fb
                                                                    .icon
                                                            }
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href={
                                                            SocialLink.instagram
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
                                                    <a href={SocialLink.yt.url}>
                                                        <i
                                                            className={
                                                                SocialLink.yt
                                                                    .icon
                                                            }
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href={
                                                            SocialLink.spotify
                                                                .url
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
        </Offcanvas>
    );
};

export default OffcanvasMenu;
