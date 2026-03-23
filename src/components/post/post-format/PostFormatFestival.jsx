import { Tab, Nav } from "react-bootstrap";
import PovezaniTekstLayout from "../layout/PovezaniTekstLayout";

const PostFormatFestival = ({ postData }) => {
    return (
        <>
            <main className="site-main">
                <div className="single-blog-wrapper p-t-xs-60">
                    <div className="post-widget sidebar-post-widget m-b-xs-40">
                        <Tab.Container
                            id="festival-post"
                            defaultActiveKey="program"
                        >
                            <Nav variant="pills" className="row no-gutters">
                                <Nav.Item className="col">
                                    <Nav.Link eventKey="info">INFO</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="col">
                                    <Nav.Link eventKey="program">
                                        PROGRAM
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="col">
                                    <Nav.Link eventKey="tekstovi">
                                        TEKSTOVI
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Tab.Content>
                                <Tab.Pane eventKey="info">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: postData.tekst_festivala,
                                        }}
                                    ></div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="program">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: postData.repertoar,
                                        }}
                                    ></div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="tekstovi">
                                    {postData.tekstovi?.map((tekst) => (
                                        <PovezaniTekstLayout
                                            data={tekst}
                                            key={`tksfest-${tekst.slug}`}
                                        />
                                    ))}
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PostFormatFestival;
