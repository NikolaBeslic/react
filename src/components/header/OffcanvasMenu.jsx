import Link from "next/link";
import Offcanvas from 'react-bootstrap/Offcanvas';
import SocialLink from "../../data/social/SocialLink.json";
import Image from "next/legacy/image";

const OffcanvasMenu = ({ ofcshow, ofcHandleClose }) => {
    return (
        <Offcanvas show={ofcshow} onHide={ofcHandleClose} placement="end" className="offcanvas-menu">
            <Offcanvas.Header closeButton className="close-offcanvasmeu"></Offcanvas.Header>
            <div className="side-nav">
                <div className="side-nav-inner nicescroll-container">
                    <div className="form-group search-field">
                        <Image
                            src="/images/hup-logo.png"
                            alt="brand-logo"
                            width={123}
                            height={34}
                        />
                    </div>
                    <div className="side-nav-content">
                        <ul className="m-b-xs-10 list-inline justify-content-between align-items-center">
                            <li>
                                <Link href="/predstave">
                                    Predstave
                                </Link>
                            </li>
                            <li>
                                <Link href="/repertoari-v2">
                                    Repertoari
                                </Link>
                            </li>
                            <li>
                                <Link href="/pozorista">
                                    Pozorišta
                                </Link>
                                <Link href="/festivali">
                                    Festivali
                                </Link>
                            </li>
                        </ul>
                        <div className="row ">
                            <div className="col-lg-6">

                                <ul className="main-navigation side-navigation list-inline flex-column">
                                    <li>
                                        <Link href="/vesti">
                                            Vesti
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/intervjui">
                                            Intervjui
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/recenzije">
                                            Recenzije
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/hupkast">
                                            HuPkast
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/#">
                                            Blog
                                        </Link>
                                    </li>
                                </ul>
                                {/* End of .main-navigation */}
                            </div>
                            {/* End of  .col-md-6 */}

                        </div>
                        {/* End of .row */}
                    </div>
                </div>
                {/* End of .side-nav-inner */}
            </div>
        </Offcanvas>
    );
}

export default OffcanvasMenu;