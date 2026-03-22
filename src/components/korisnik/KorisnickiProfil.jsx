import { Tab, Nav, Stack, Container, Row } from "react-bootstrap";
import PredstavaListaZelja from "../predstave/PredstavaListaZelja";
import PredstavaOdgledana from "../predstave/PredstavaOdgledana";
import KorisnikKomentar from "./KorisnikKomentar";
import OmiljenoPozoriste from "./OmiljenoPozoriste";
import { useState } from "react";
import axiosClient from "../../utils/axios";
import { csrf, getCookieValue } from "../../utils";
import PredstaveLayout from "../post/layout/PredstaveLayout";
import EmptyState from "../predstave/EmptyState";

const KorisnickiProfil = ({ korisnik }) => {
    const [listaZelja, setListaZelja] = useState(korisnik.lista_zelja);
    const [listaOdgledanih, setListaOdgledanih] = useState(
        korisnik.lista_odgledanih,
    );

    const handlePrebaciUOdgledane = async (predstavaid) => {
        try {
            await csrf();
            const res = await axiosClient.post(
                "/predstava/dodajUOdgledane",
                { predstavaid },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    },
                },
            );

            const predstava = res.data;
            setListaZelja((prev) =>
                prev.filter(
                    (item) => item.predstavaid !== predstava.predstavaid,
                ),
            );
            setListaOdgledanih((prev) => [...prev, predstava]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleObrisiSaListeZelja = async (predstavaid) => {
        try {
            await csrf();
            const res = await axiosClient.delete(
                `/obrisi-sa-liste-zelja/${predstavaid}`,
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                    },
                },
            );

            setListaZelja((prev) =>
                prev.filter(
                    (item) => item.predstavaid !== res.data, //api returns only predstavaid
                ),
            );
        } catch (err) {
            console.error(err);
        }
    };

    const oceniOdgledanuPredstavu = async (predstavaid, ocena) => {
        try {
            await csrf();
            const res = await axiosClient.post(
                "/predstava/oceni",
                {
                    ocena: ocena,
                    user: korisnik,
                    predstavaid: predstavaid,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                        "Content-Type": "application/json",
                    },
                },
            );
            debugger;
            let predstava = listaOdgledanih.find(
                (item) => item.predstavaid == predstavaid,
            );
            predstava.ocena_korisnika = { ocena: res.data.ocenaKorisnika };
            setListaOdgledanih((prev) => [...prev, predstava]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper p-t-xs-30 p-t-md-60">
                    <div className="post-widget sidebar-post-widget m-b-xs-40">
                        <Tab.Container
                            id="korisnicki-profil-tabs"
                            defaultActiveKey="zelje"
                        >
                            <Nav
                                variant="pills"
                                className="row no-gutters korisnicki-profil-tab-nav"
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
                                    <div className="axil-team-grid-wrapper p-t-xs-10">
                                        <Row>
                                            {listaZelja?.length > 0 ? (
                                                <>
                                                    {listaZelja?.map((lz) => (
                                                        <div
                                                            className="col-lg-4 col-md-4 col-sm-6"
                                                            key={`lzdiv-${lz.predstavaid}`}
                                                        >
                                                            <PredstavaListaZelja
                                                                key={`lz-${lz.predstavaid}`}
                                                                data={lz}
                                                                onPrebaci={
                                                                    handlePrebaciUOdgledane
                                                                }
                                                                onRemove={
                                                                    handleObrisiSaListeZelja
                                                                }
                                                            />
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <EmptyState
                                                    icon="heart"
                                                    title="Još nemate predstava u listi želja"
                                                    text="Sačuvajte predstave koje želite da pogledate i pronađite ih kasnije na jednom mestu."
                                                    buttonText="Istraži repertoar"
                                                    href="/repertoar"
                                                />
                                            )}
                                        </Row>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="odgledane">
                                    {listaOdgledanih?.length > 0 ? (
                                        <>
                                            {listaOdgledanih?.map((odg) => (
                                                <PredstavaOdgledana
                                                    data={odg}
                                                    handleRate={
                                                        oceniOdgledanuPredstavu
                                                    }
                                                    pClass=""
                                                    key={`pred${odg.predstavaid}`}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <EmptyState
                                            icon="eye"
                                            title="Još nemate odgledanih predstava"
                                            text="Dodajte predstave koje ste pogledali i vodite svoju ličnu evidenciju."
                                            buttonText="Pregledaj predstave"
                                            href="/predstave"
                                        />
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="komentari">
                                    {korisnik.komentari?.length > 0 ? (
                                        <>
                                            {korisnik.komentari?.map((kom) => (
                                                <KorisnikKomentar
                                                    key={`kk-${kom.komentarid}`}
                                                    data={kom}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <EmptyState
                                            icon="comment"
                                            title="Još niste ostavili nijedan komentar"
                                            text="Vaši utisci o predstavama i tekstovima pojaviće se ovde."
                                            buttonText="Pregledaj sadržaj"
                                            href="/predstave"
                                        />
                                    )}
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
