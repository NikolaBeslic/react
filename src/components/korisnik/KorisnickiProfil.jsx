import { Tab, Nav, Stack, Container, Row } from "react-bootstrap";
import PredstavaListaZelja from "../predstave/PredstavaListaZelja";
import PredstavaOdgledana from "../predstave/PredstavaOdgledana";
import KorisnikKomentar from "./KorisnikKomentar";
import OmiljenoPozoriste from "./OmiljenoPozoriste";

const KorisnickiProfil = ({ korisnik }) => {
    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper">
                    <div className="post-widget sidebar-post-widget m-b-xs-40">
                        <Tab.Container
                            id="korisnicki-profil-tabs"
                            defaultActiveKey="zelje"
                        >
                            <Nav variant="pills" className="row no-gutters">
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
                                    <div className="axil-team-grid-wrapper p-t-xs-10">
                                        <Row>
                                            {korisnik.lista_zelja?.map((lz) => (
                                                <div
                                                    className="col-lg-4 col-md-4 col-sm-6"
                                                    key={`lzdiv-${lz.predstavaid}`}
                                                >
                                                    <PredstavaListaZelja
                                                        key={`lz-${lz.predstavaid}`}
                                                        data={lz}
                                                    />
                                                </div>
                                            ))}
                                        </Row>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="odgledane">
                                    {korisnik.lista_odgledanih?.map((odg) => (
                                        <PredstavaOdgledana
                                            key={`odg-${odg.predstavaid}`}
                                            data={odg}
                                        />
                                    ))}
                                </Tab.Pane>
                                <Tab.Pane eventKey="komentari">
                                    {korisnik.komentari?.map((kom) => (
                                        <KorisnikKomentar
                                            key={`kk-${kom.komentarid}`}
                                            data={kom}
                                        />
                                    ))}
                                </Tab.Pane>
                                <Tab.Pane eventKey="pozorista">
                                    <div className="axil-team-grid-wrapper p-t-xs-10">
                                        <Row>
                                            {korisnik.omiljena_pozorista?.map(
                                                (poz) => (
                                                    <div
                                                        className="col-lg-4 col-md-4 col-sm-6"
                                                        key={`opdiv-${poz.pozoristeid}`}
                                                    >
                                                        <OmiljenoPozoriste
                                                            data={poz}
                                                            key={`op-${poz.pozoristeid}`}
                                                        />
                                                    </div>
                                                ),
                                            )}
                                        </Row>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </main>
        </>
    );
};

export default KorisnickiProfil;
