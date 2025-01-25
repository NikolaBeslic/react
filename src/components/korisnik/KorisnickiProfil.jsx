import { Tab, Nav } from "react-bootstrap";
import WidgetAd from "../widget/WidgetAd";
import WidgetInstagram from "../widget/WidgetInstagram";
import WidgetNewsletter from "../widget/WidgetNewsletter";
import WidgetSocialShare from "../widget/WidgetSocialShare";
import WidgetPremijere from "../widget/WidgetPremijere";
import WidgetPost from "../widget/WidgetPost";

const KorisnickiProfil = ({ korisnik }) => {
    return (
        <>
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12"></div>
                        <div className="post-title-wrapper">
                            <h1 className="m-b-xs-0 axil-post-title hover-line">
                                Korisnicki profil
                            </h1>
                            <div className="post-metas banner-post-metas m-t-xs-20">
                                <ul className="list-inline">
                                    <li>
                                        <i className="fa-regular fa-location-dot"></i>
                                        Grad
                                    </li>
                                    <li>
                                        <i className="fa-regular fa-at"></i>
                                        {korisnik.email}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="post-single-wrapper p-t-xs-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <main className="site-main">
                                <div className="single-blog-wrapper">
                                    <div className="post-widget sidebar-post-widget m-b-xs-40">
                                        <Tab.Container
                                            id="korisnicki-profil-tabs"
                                            defaultActiveKey="zelje"
                                        >
                                            <Nav
                                                variant="pills"
                                                className="row no-gutters"
                                            >
                                                <Nav.Item className="col">
                                                    <Nav.Link eventKey="zelje">
                                                        LISTA ŽELJA
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className="col">
                                                    <Nav.Link eventKey="odgledane">
                                                        ODGLEDANE PREDSTAVE
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className="col">
                                                    <Nav.Link eventKey="komentari">
                                                        KOMENTARI
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item className="col">
                                                    <Nav.Link eventKey="pozorista">
                                                        OMILJENA POZORIŠTA
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>

                                            <Tab.Content>
                                                <Tab.Pane eventKey="zelje">
                                                    {korisnik.lista_zelja?.map(
                                                        (lz) => (
                                                            <p
                                                                key={
                                                                    lz.predstavaid
                                                                }
                                                            >
                                                                {
                                                                    lz.naziv_predstave
                                                                }
                                                            </p>
                                                        )
                                                    )}
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="odgledane">
                                                    {korisnik.lista_odgledanih?.map(
                                                        (odg) => (
                                                            <p
                                                                key={
                                                                    odg.predstavaid
                                                                }
                                                            >
                                                                {
                                                                    odg.naziv_predstave
                                                                }
                                                            </p>
                                                        )
                                                    )}
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="komentari">
                                                    {korisnik.komentari?.map(
                                                        (kom) => (
                                                            <p
                                                                key={
                                                                    kom.komentarid
                                                                }
                                                            >
                                                                {
                                                                    kom.tekst_komentara
                                                                }
                                                            </p>
                                                        )
                                                    )}
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="pozorista"></Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </div>
                                </div>
                            </main>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                {/* <WidgetPost posts={sidePosts} /> */}
                                <WidgetNewsletter />
                                {/* <WidgetPremijere premijere={premijere} /> */}
                                <WidgetSocialShare />
                                {/* <WidgetPost dataPost={allData} /> */}
                                <WidgetInstagram />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default KorisnickiProfil;
