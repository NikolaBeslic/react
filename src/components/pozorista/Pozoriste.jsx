import { Tab, Nav } from "react-bootstrap";
import Izvodjenje from "../predstave/Izvodjenje";
import PostLayoutTwo from "../post/layout/PostLayoutTwo";
import PredstaveLayout from "../post/layout/PredstaveLayout";
import { useState } from "react";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/StateContext";

const Pozoriste = ({ data, sidePosts, premijere }) => {
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
        data.omiljenoKorisnika
    );

    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper">
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
                                    {data.igranja?.map((igranje) => (
                                        <Izvodjenje
                                            izvodjenjeData={igranje}
                                            showPredstava={true}
                                            showPozoriste={false}
                                            key={igranje.seigraid}
                                        />
                                    ))}
                                </Tab.Pane>
                                <Tab.Pane eventKey="tekstovi">
                                    {visibleTexts?.map((tekst) => (
                                        <PostLayoutTwo
                                            data={tekst}
                                            key={tekst?.tekstid}
                                        />
                                    ))}
                                    {visibleCount <
                                        tekstoviPozorista?.length && ( // Show button if there are more items to load
                                        <button onClick={handleLoadMore}>
                                            Load More
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
                                            onClick={handleLoadMorePredstave}
                                        >
                                            Load More
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
