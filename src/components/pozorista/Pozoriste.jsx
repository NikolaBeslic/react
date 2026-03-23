import { Tab, Nav } from "react-bootstrap";
import Izvodjenje from "../predstave/Izvodjenje";
import PovezaniTekstLayout from "../post/layout/PovezaniTekstLayout";
import PredstaveLayout from "../post/layout/PredstaveLayout";
import { useState } from "react";

const Pozoriste = ({ data, sidePosts, premijere }) => {
    const [visibleCountIzvodjenja, setVisibleCountIzvodjenja] = useState(15);
    const izvodjenjaPredstva = data?.igranja || [];
    const visibleIzvodjenja = izvodjenjaPredstva.slice(
        0,
        visibleCountIzvodjenja,
    );

    const handleLoadMoreIzvodjenja = () => {
        setVisibleCountIzvodjenja((prevCount) => prevCount + 10);
    };

    const [visibleCount, setVisibleCount] = useState(7);
    const tekstoviPozorista = data?.tekstovi || [];
    const visibleTexts = tekstoviPozorista.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
    };

    const [visibleCountPredstave, setVisibleCountPredstave] = useState(15);
    const predstave = data.predstave || [];
    const visiblePredstave = predstave.slice(0, visibleCountPredstave);

    const handleLoadMorePredstave = () => {
        setVisibleCountPredstave(visibleCountPredstave + 5);
    };

    const [omiljenoKorisnika, setOmiljenoKorisnika] = useState(
        data.omiljenoKorisnika,
    );

    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper p-t-xs-60">
                    <div className="post-widget sidebar-post-widget m-b-xs-40">
                        <Tab.Container
                            id="pozoriste-post"
                            defaultActiveKey="repertoar"
                        >
                            <Nav variant="pills" className="row no-gutters">
                                <Nav.Item className="col">
                                    <Nav.Link eventKey="repertoar">
                                        REPERTOAR
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="col">
                                    <Nav.Link eventKey="tekstovi">
                                        TEKSTOVI
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="col">
                                    <Nav.Link eventKey="predstave">
                                        PREDSTAVE
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="col">
                                    <Nav.Link eventKey="istorijat">
                                        ISTORIJAT
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Tab.Content>
                                <Tab.Pane eventKey="repertoar">
                                    {visibleIzvodjenja?.map((igranje) => (
                                        <Izvodjenje
                                            izvodjenjeData={igranje}
                                            showPredstava={true}
                                            showPozoriste={false}
                                            key={igranje.seigraid}
                                        />
                                    ))}
                                    {visibleCountIzvodjenja <
                                        izvodjenjaPredstva?.length && ( // Show button if there are more items to load
                                        <button
                                            className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                                            onClick={handleLoadMoreIzvodjenja}
                                        >
                                            Učitaj još
                                        </button>
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="tekstovi">
                                    {visibleTexts?.map((tekst) => (
                                        <PovezaniTekstLayout
                                            data={tekst}
                                            key={`pozrltd-${tekst?.tekstid}`}
                                        />
                                    ))}
                                    {visibleCount <
                                        tekstoviPozorista?.length && ( // Show button if there are more items to load
                                        <button
                                            className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                                            onClick={handleLoadMore}
                                        >
                                            Učitaj još
                                        </button>
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="predstave">
                                    {visiblePredstave.map((pred) => (
                                        <PredstaveLayout
                                            data={pred}
                                            pClass=""
                                            key={pred.predstavaid}
                                        />
                                    ))}
                                    {visibleCountPredstave <
                                        predstave?.length && (
                                        <button
                                            className="btn btn-primary btn-small btn-load-more d-block mx-auto mt-4"
                                            onClick={handleLoadMorePredstave}
                                        >
                                            Učitaj još
                                        </button>
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="istorijat">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data.istorija_pozorista,
                                        }}
                                    ></div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Pozoriste;
