import { Tab, Nav, Row, Spinner, Button } from "react-bootstrap";
import PredstavaListaZelja from "../predstave/PredstavaListaZelja";
import PredstavaOdgledana from "../predstave/PredstavaOdgledana";
import KorisnikKomentar from "./KorisnikKomentar";
import { useEffect, useMemo, useState } from "react";
import axiosClient from "../../utils/axios";
import { csrf, getCookieValue } from "../../utils";
import EmptyState from "../predstave/EmptyState";
import { toast } from "react-hot-toast";

const endpointMap = {
    zelja: "/korisnik/lista-zelja",
    odgledane: "/korisnik/lista-odgledanih",
    komentari: "/korisnik/komentari",
};

export default function KorisnickiProfil({ korisnik: initialKorisnik }) {
    const [korisnik, setKorisnik] = useState(initialKorisnik);

    const [activeTab, setActiveTab] = useState("zelja");
    const [tabsData, setTabsData] = useState({
        zelja: {
            items: [],
            currentPage: 0,
            hasMore: true,
            loading: false,
            loaded: false,
        },
        odgledane: {
            items: [],
            currentPage: 0,
            hasMore: true,
            loading: false,
            loaded: false,
        },
        komentari: {
            items: [],
            currentPage: 0,
            hasMore: true,
            loading: false,
            loaded: false,
        },
    });

    const fetchTabData = async (tabKey, page = 1, append = false) => {
        if (tabsData[tabKey].loading) return;

        setTabsData((prev) => ({
            ...prev,
            [tabKey]: {
                ...prev[tabKey],
                loading: true,
            },
        }));

        try {
            const res = await axiosClient.get(endpointMap[tabKey], {
                params: {
                    page,
                },
            });

            const payload = res.data;

            setTabsData((prev) => ({
                ...prev,
                [tabKey]: {
                    ...prev[tabKey],
                    items: append
                        ? [...prev[tabKey].items, ...payload.data]
                        : payload.data,
                    currentPage: payload.current_page,
                    hasMore: payload.current_page < payload.last_page,
                    loading: false,
                    loaded: true,
                },
            }));
        } catch (error) {
            console.error(error);
            toast.error(
                "Greška prilikom učitavanja podataka. Pokušajte ponovo.",
            );
            setTabsData((prev) => ({
                ...prev,
                [tabKey]: {
                    ...prev[tabKey],
                    loading: false,
                },
            }));
        }
    };

    useEffect(() => {
        fetchTabData("zelja");
    }, []);

    const handleTabChange = async (tabKey) => {
        setActiveTab(tabKey);

        if (!tabsData[tabKey].loaded) {
            await fetchTabData(tabKey);
        }
    };

    const handleLoadMore = async () => {
        const current = tabsData[activeTab];

        if (!current.hasMore || current.loading) return;

        await fetchTabData(activeTab, current.currentPage + 1, true);
    };

    const currentTab = useMemo(
        () => tabsData[activeTab],
        [tabsData, activeTab],
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

            setTabsData((prev) => {
                const predstava = prev.zelja.items.find(
                    (item) => item.predstavaid === predstavaid,
                );

                return {
                    ...prev,
                    zelja: {
                        ...prev.zelja,
                        items: prev.zelja.items.filter(
                            (item) => item.predstavaid !== predstavaid,
                        ),
                    },
                    odgledane: {
                        ...prev.odgledane,
                        items: predstava
                            ? [
                                  predstava,
                                  ...prev.odgledane.items.filter(
                                      (item) =>
                                          item.predstavaid !== predstavaid,
                                  ),
                              ]
                            : prev.odgledane.items,
                    },
                };
            });

            setKorisnik((prev) => ({
                ...prev,
                broj_liste_zelja: Math.max((prev.broj_liste_zelja || 0) - 1, 0),
                broj_odgledanih: (prev.broj_odgledanih || 0) + 1,
            }));
        } catch (err) {
            console.error(err);
            toast.error(
                "Greška prilikom prebacivanja predstave. Pokušajte ponovo.",
            );
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

            setTabsData((prev) => ({
                ...prev,
                zelja: {
                    ...prev.zelja,
                    items: prev.zelja.items.filter(
                        (item) => item.predstavaid !== predstavaid,
                    ),
                },
            }));

            setKorisnik((prev) => ({
                ...prev,
                broj_liste_zelja: Math.max((prev.broj_liste_zelja || 0) - 1, 0),
            }));
        } catch (err) {
            console.error(err);
            toast.error(
                "Greška prilikom brisanja predstave. Pokušajte ponovo.",
            );
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
            setTabsData((prev) => ({
                ...prev,
                odgledane: {
                    ...prev.odgledane,
                    items: prev.odgledane.items.map((item) =>
                        item.predstavaid === predstavaid
                            ? {
                                  ...item,
                                  ocena_korisnika: {
                                      ...(item.ocena_korisnika || {}),
                                      ocena: res.data.ocenaKorisnika,
                                  },
                              }
                            : item,
                    ),
                },
            }));
        } catch (err) {
            console.error(err);
            toast.error("Greška prilikom ocenjivanja. Pokušajte ponovo.");
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
                            activeKey={activeTab}
                            onSelect={handleTabChange}
                        >
                            <Nav
                                variant="pills"
                                className="row no-gutters korisnicki-profil-tab-nav"
                            >
                                <Nav.Item className="col">
                                    <Nav.Link eventKey="zelja">
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
                            </Nav>

                            <Tab.Content>
                                <Tab.Pane eventKey="zelja">
                                    {renderTabContent("zelja", currentTab)}
                                </Tab.Pane>
                                <Tab.Pane eventKey="odgledane">
                                    {renderTabContent("odgledane", currentTab)}
                                </Tab.Pane>
                                <Tab.Pane eventKey="komentari">
                                    {renderTabContent("komentari", currentTab)}
                                </Tab.Pane>
                            </Tab.Content>
                            {currentTab.loaded && currentTab.hasMore && (
                                <div className="text-center mt-4">
                                    <Button
                                        variant="primary"
                                        onClick={handleLoadMore}
                                        disabled={currentTab.loading}
                                    >
                                        {currentTab.loading
                                            ? "Učitavanje..."
                                            : "Učitaj još"}
                                    </Button>
                                </div>
                            )}
                        </Tab.Container>
                    </div>
                </div>
            </main>
        </>
    );

    function renderTabContent(tabKey, tabData) {
        if (activeTab !== tabKey) return null;

        if (tabData.loading && tabData.items.length === 0) {
            return (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            );
        }

        if (!tabData.loading && tabData.items.length === 0) {
            if (tabKey === "zelja") {
                return (
                    <EmptyState
                        icon="listCheck"
                        title="Još nemate predstava na listi želja"
                        text="Sačuvajte predstave koje želite da pogledate i pronađite ih kasnije na jednom mestu."
                        buttonText="Istraži repertoare"
                        href="/repertoar"
                    />
                );
            }

            if (tabKey === "odgledane") {
                return (
                    <EmptyState
                        icon="eye"
                        title="Još nemate odgledanih predstava"
                        text="Dodajte predstave koje ste pogledali i vodite svoju ličnu evidenciju."
                        buttonText="Pregledaj predstave"
                        href="/predstave"
                    />
                );
            }

            return (
                <EmptyState
                    icon="comment"
                    title="Još niste ostavili nijedan komentar"
                    text="Vaši utisci o predstavama i tekstovima pojaviće se ovde."
                    buttonText="Pročitaj naše utske"
                    href="/recenzije"
                />
            );
        }

        if (tabKey === "zelja") {
            return (
                <div className="axil-team-grid-wrapper p-t-xs-10">
                    <Row>
                        {tabData.items?.map((lz) => (
                            <div
                                className="col-lg-4 col-md-4 col-sm-6"
                                key={`lzdiv-${lz.predstavaid}`}
                            >
                                <PredstavaListaZelja
                                    key={`lz-${lz.predstavaid}`}
                                    data={lz}
                                    onPrebaci={handlePrebaciUOdgledane}
                                    onRemove={handleObrisiSaListeZelja}
                                />
                            </div>
                        ))}
                    </Row>
                </div>
            );
        }

        if (tabKey === "odgledane") {
            return (
                <div>
                    {tabData.items?.map((odg) => (
                        <PredstavaOdgledana
                            data={odg}
                            handleRate={oceniOdgledanuPredstavu}
                            pClass=""
                            key={`pred${odg.predstavaid}`}
                        />
                    ))}
                </div>
            );
        }

        return (
            <div>
                {tabData.items?.map((kom) => (
                    <KorisnikKomentar key={`kk-${kom.komentarid}`} data={kom} />
                ))}
            </div>
        );
    }
}
