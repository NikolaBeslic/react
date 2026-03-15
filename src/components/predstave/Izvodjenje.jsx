import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";

const Izvodjenje = ({ izvodjenjeData, showPredstava, showPozoriste }) => {
    return (
        <div className="media post-block post-block__small izvodjenje-wrapper m-b-xs-20">
            <div className="izvodjenje-date">
                <span className="izvodjenje-dan">
                    {moment(izvodjenjeData.datum).format("ddd")}{" "}
                </span>
                <br />
                <span className="izvodjenje-datum">
                    {moment(izvodjenjeData.datum).format("DD.")}{" "}
                </span>{" "}
                <br />
                <span className="izvodjenje-mesec">
                    {moment(izvodjenjeData.datum).format("MMM")}{" "}
                </span>{" "}
                <br />
            </div>

            <div className="izvodjenje-vreme-predstava-pozoriste-wrapper">
                <div className="izvodjenje-vreme">
                    <i className="fa-regular fa-clock"></i>{" "}
                    {moment(`1970-01-01 ${izvodjenjeData.vreme}`).format(
                        "HH:mm",
                    )}
                </div>
                {showPredstava && (
                    <div className="izvodjenje-predstava">
                        <Link
                            href={`/predstave/${izvodjenjeData.predstava.predstava_slug}`}
                        >
                            <strong>
                                {izvodjenjeData.predstava.naziv_predstave}
                            </strong>
                        </Link>
                    </div>
                )}
                <div className="izvodjenje-pozoriste">
                    {showPozoriste && showPredstava && (
                        <>
                            <span className="pozoriste-desktop-name">
                                {izvodjenjeData.pozoriste.naziv_pozorista}
                            </span>
                            <span className="pozoriste-mobile-name">
                                {izvodjenjeData.pozoriste.skraceni_naziv}
                            </span>
                        </>
                    )}
                    {showPozoriste && !showPredstava && (
                        <strong>
                            {izvodjenjeData.pozoriste.naziv_pozorista}
                        </strong>
                    )}
                    {izvodjenjeData.scena && (
                        <span className="izvodjenje-scena text-muted">
                            {" "}
                            | {izvodjenjeData.scena.naziv_scene}
                        </span>
                    )}
                </div>
            </div>

            <div className="izvodjenje-plakat">
                {showPredstava && (
                    <Link
                        href={`/predstave/${izvodjenjeData.predstava.predstava_slug}`}
                    >
                        <Image
                            src={
                                izvodjenjeData?.predstava.plakat ||
                                "/slike/vizitke-cover.jpg"
                            }
                            alt={izvodjenjeData?.predstava.predstava_slug}
                            height={90}
                            width={60}
                            objectFit="cover"
                            quality={90}
                        />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Izvodjenje;
