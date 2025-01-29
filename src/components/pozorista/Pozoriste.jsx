import { Tab, Nav, Button, Spinner } from "react-bootstrap";
import WidgetAd from "../widget/WidgetAd";
import WidgetInstagram from "../widget/WidgetInstagram";
import WidgetNewsletter from "../widget/WidgetNewsletter";
import WidgetSocialShare from "../widget/WidgetSocialShare";
import Izvodjenje from "../predstave/Izvodjenje";
import PostLayoutTwo from "../post/layout/PostLayoutTwo";
import PredstaveLayout from "../post/layout/PredstaveLayout";
import { useState } from "react";
import WidgetPremijere from "../widget/WidgetPremijere";
import WidgetPost from "../widget/WidgetPost";
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
    const { currentUser } = useStateContext();
    const [omiljenaLoading, setOmiljenaLoading] = useState(false);
    const [omiljenoKorisnika, setOmiljenoKorisnika] = useState(
        data.omiljenoKorisnika
    );

    const handleDodajUOmiljena = () => {
        if (!currentUser) {
            alert("You must be logged in to rate a post.");
            return;
        }
        setOmiljenaLoading(true);
        axiosClient
            .post(
                "/pozorista/dodajUOmiljena",
                { pozoristeId: data.pozoristeid },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                setOmiljenaLoading(false);
                setOmiljenoKorisnika(true);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="post-title-wrapper">
                                <h1 className="m-b-xs-0 axil-post-title hover-line">
                                    {data.naziv_pozorista}
                                </h1>
                                <div className="post-metas banner-post-metas m-t-xs-20">
                                    <ul className="list-inline">
                                        <li>
                                            <i className="fa-regular fa-location-dot"></i>
                                            {data.adresa}
                                        </li>
                                        <li>
                                            <i className="fa-regular fa-phone"></i>
                                            {data.telefon}
                                        </li>
                                        <li>
                                            <i className="fa-regular fa-at"></i>
                                            {data.email}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {omiljenoKorisnika ? (
                                <Button
                                    variant="primary"
                                    className="btn btn-secondary btn-small"
                                    disabled
                                >
                                    <i className="fa-solid fa-heart"></i>
                                    Omiljeno pozoriste
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    className="btn btn-primary btn-small"
                                    onClick={handleDodajUOmiljena}
                                >
                                    {omiljenaLoading ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            role="status"
                                        />
                                    ) : (
                                        <i className="fa-regular fa-heart"></i>
                                    )}{" "}
                                    Dodaj u omiljena
                                </Button>
                            )}
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
                                            id="pozoriste-post"
                                            defaultActiveKey="repertoar"
                                        >
                                            <Nav
                                                variant="pills"
                                                className="row no-gutters"
                                            >
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
                                                    {data.igranja?.map(
                                                        (igranje) => (
                                                            <Izvodjenje
                                                                izvodjenjeData={
                                                                    igranje
                                                                }
                                                                showPredstava={
                                                                    true
                                                                }
                                                                showPozoriste={
                                                                    false
                                                                }
                                                                key={
                                                                    igranje.seigraid
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="tekstovi">
                                                    {visibleTexts?.map(
                                                        (tekst) => (
                                                            <PostLayoutTwo
                                                                data={tekst}
                                                                key={
                                                                    tekst?.tekstid
                                                                }
                                                            />
                                                        )
                                                    )}
                                                    {visibleCount <
                                                        tekstoviPozorista?.length && ( // Show button if there are more items to load
                                                        <button
                                                            onClick={
                                                                handleLoadMore
                                                            }
                                                        >
                                                            Load More
                                                        </button>
                                                    )}
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="predstave">
                                                    {visiblePredstave.map(
                                                        (pred) => (
                                                            <PredstaveLayout
                                                                data={pred}
                                                                pClass=""
                                                                key={
                                                                    pred.predstavaid
                                                                }
                                                            />
                                                        )
                                                    )}
                                                    {visibleCountPredstave <
                                                        predstave?.length && (
                                                        <button
                                                            onClick={
                                                                handleLoadMorePredstave
                                                            }
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
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                <WidgetPost posts={sidePosts} />
                                <WidgetNewsletter />
                                <WidgetPremijere premijere={premijere} />
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

export default Pozoriste;
