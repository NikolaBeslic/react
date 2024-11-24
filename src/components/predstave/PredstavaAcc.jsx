import SectionTitle from "../elements/SectionTitle";
import PostLayoutFour from "../post/layout/PostLayoutFour";
import PredstavaTitle from "../post/post-format/elements/meta/PredstavaTitle";
import WidgetAd from "../widget/WidgetAd";
import WidgetInstagram from "../widget/WidgetInstagram";
import WidgetNewsletter from "../widget/WidgetNewsletter";
import WidgetSocialShare from "../widget/WidgetSocialShare";
import Accordion from 'react-bootstrap/Accordion';

const PredstavaAcc = ({ data }) => {
    const recenzije = data.tekstovi?.filter((tekst) => tekst.kategorija.kategorijaid == 4);
    return (
        <>
            <PredstavaTitle metaData={data} />
            <div className="post-single-wrapper p-t-xs-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <main className="site-main">
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Opis</Accordion.Header>
                                        <Accordion.Body>
                                            <div dangerouslySetInnerHTML={{ __html: data.opis }}></div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {recenzije?.length > 0 &&
                                        <>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Iz našeg ugla</Accordion.Header>
                                                <Accordion.Body>
                                                    {recenzije.map((tekst) =>
                                                        <>
                                                            <h3>{tekst.naslov}</h3>

                                                            <div dangerouslySetInnerHTML={{ __html: tekst.sadrzaj.slice(0, 350) }}></div >
                                                        </>

                                                    )}
                                                </Accordion.Body>
                                            </Accordion.Item >
                                        </>
                                    }
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Uloge</Accordion.Header>
                                        <Accordion.Body>
                                            <div dangerouslySetInnerHTML={{ __html: data.uloge }}></div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Izvođenja</Accordion.Header>
                                        <Accordion.Body>
                                            <div>Ovde bi nekako isao spisak narednih izvodjenja</div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>Povezani tekstovi</Accordion.Header>
                                        <Accordion.Body>
                                            <div>Bla bla</div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </main>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetAd />
                                <WidgetNewsletter />
                                <WidgetSocialShare />
                                {/* <WidgetPost dataPost={allData} /> */}
                                <WidgetInstagram />
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
};

export default PredstavaAcc;