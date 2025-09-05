import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";
import { Col } from "react-bootstrap";

const Izvodjenje = ({ izvodjenjeData, showPredstava, showPozoriste }) => {
    return (
        <div className="izvodjenje-wrapper row m-b-xs-20">
            <Col
                xs={3}
                lg={3}
                key={`izvodjenje-col1-${izvodjenjeData.seigraid}`}
            >
                <div className="izvodjenje-date">
                    <span className="izvodjenje-dan">
                        {moment(izvodjenjeData.datum).format("ddd")}{" "}
                    </span>
                    <br />
                    <span className="izvodjenje-datum">
                        {moment(izvodjenjeData.datum).format("DD. MMM")}{" "}
                    </span>{" "}
                    <br />
                </div>
            </Col>
            <Col
                xs={6}
                lg={6}
                key={`izvodjenje-col2-${izvodjenjeData.seigraid}`}
            >
                <div className="izvodjenje-vreme">
                    <i className="fa-thin fa-clock"></i>{" "}
                    {moment(`1970-01-01 ${izvodjenjeData.vreme}`).format(
                        "HH:mm"
                    )}
                </div>
                {showPredstava && (
                    <div className="izvodjenje-predstava">
                        <a
                            href={`/predstave/${izvodjenjeData.predstava.predstava_slug}`}
                        >
                            <strong>
                                {izvodjenjeData.predstava.naziv_predstave}
                            </strong>
                        </a>
                    </div>
                )}
                <div className="izvodjenje-pozoriste">
                    {showPozoriste && showPredstava && (
                        <span> {izvodjenjeData.pozoriste.naziv_pozorista}</span>
                    )}
                    {showPozoriste && !showPredstava && (
                        <strong>
                            {izvodjenjeData.pozoriste.naziv_pozorista}
                        </strong>
                    )}
                    {izvodjenjeData.scena && (
                        <span className="izvodjenje-scena">
                            {" "}
                            | {izvodjenjeData.scena.naziv_scene}
                        </span>
                    )}
                </div>
            </Col>
            <Col
                xs={3}
                lg={3}
                key={`izvodjenje-col3-${izvodjenjeData.seigraid}`}
            >
                <div className="izvodjenje-plakat">
                    {showPredstava && (
                        <a
                            href={`/predstave/${izvodjenjeData.predstava.predstava_slug}`}
                        >
                            <Image
                                src={
                                    izvodjenjeData?.predstava.plakat ||
                                    "/slike/vizitke-cover.jpg"
                                }
                                alt={izvodjenjeData?.predstava.predstava_slug}
                                height={100}
                                width={50}
                                objectFit="cover"
                            />
                        </a>
                    )}
                </div>
            </Col>
        </div>
    );
};

export default Izvodjenje;
