import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import moment from "moment";
import RepertoariSlider from "../slider/RepertoariSlider";

const WidgetToday = ({ izvodjenja }) => {
    const pClass = "";
    const itemsCount = izvodjenja?.length || 0;

    let height = "180px";
    if (itemsCount === 2) height = "280px";
    if (itemsCount === 3) height = "390px";
    if (itemsCount > 3) height = "500px";

    return (
        <div
            className="category-widget m-b-xs-40 repertoar-naslovna-widget-wrapper"
            style={{ height: height }}
        >
            <div className="widget-title">
                <h3>Danas na repertoaru</h3>
            </div>

            <div className="widget-body">
                {itemsCount > 3 && <RepertoariSlider izvodjenja={izvodjenja} />}

                {itemsCount > 0 && itemsCount <= 3 && (
                    <>
                        {izvodjenja.map((izv) => (
                            <div
                                className={`media post-block post-block__small repertoar-naslovna-wrapper ${
                                    pClass ?? "post-block__on-dark-bg m-b-xs-30"
                                }`}
                                key={`dnsrep-${izv.seigraid}`}
                            >
                                <div className="media-body repertoar-naslovna-info">
                                    <div className="post-cat-group repertoar-naslovna-vreme">
                                        <FontAwesomeIcon icon={faClock} />{" "}
                                        {moment(
                                            `2020-01-01 ${izv.vreme}`,
                                        ).format("HH:mm")}
                                    </div>
                                    <h6 className="hover-line hover-line predstava-index-title">
                                        <Link
                                            href={`/predstave/${izv.predstava.predstava_slug}`}
                                            title={
                                                izv.predstava.naziv_predstave
                                            }
                                            aria-label={
                                                izv.predstava.naziv_predstave
                                            }
                                            key={`dnsreplink-${izv.seigraid}`}
                                        >
                                            {izv.predstava.naziv_predstave}
                                        </Link>
                                    </h6>
                                    <div className="post-metas">
                                        <span className="text-muted">
                                            {izv.pozoriste.naziv_pozorista}{" "}
                                            {izv.scena &&
                                                `| ${izv.scena.naziv_scene}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {itemsCount === 0 && (
                    <p>
                        <FontAwesomeIcon icon={faFaceFrown} />
                        Danas nema predstava
                    </p>
                )}
            </div>
        </div>
    );
};

export default WidgetToday;
