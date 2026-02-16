import Image from "next/legacy/image";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faComments } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const PredstaveLayout = ({ data, pClass, videoIcon, showPozoriste }) => {
    return (
        <div
            className={`media post-block post-block__small bg-grey-light-three predstava-index-wrapper ${
                pClass ?? "post-block__on-dark-bg m-b-xs-30"
            }`}
        >
            <a
                href={`/predstave/${data.predstava_slug}`}
                className="align-self-center"
            >
                <>
                    <Image
                        src={data.plakat || "/slike/vizitke-cover.jpg"}
                        alt={data.predstava_slug}
                        width={80}
                        height={120}
                        objectFit="cover"
                        onErrorCapture={(e) => {
                            e.currentTarget.src = "/slike/vizitke-cover.jpg";
                        }}
                    />
                    {videoIcon === true ? (
                        <span className="video-play-btn video-play-btn__small" />
                    ) : (
                        ""
                    )}
                </>
            </a>

            <div className="media-body predstava-index-info">
                <div className="post-cat-group">
                    {data.zanrovi?.map((zanr) => (
                        <a
                            href={`/category/${zanr.naziv_zanra}`}
                            className="post-cat zanr-button"
                            style={{
                                color: zanr.zanr_boja,
                                borderColor: zanr.zanr_boja,
                            }}
                            key={zanr.zanrid}
                        >
                            {zanr.naziv_zanra}
                        </a>
                    ))}
                </div>
                <h3 className="axil-post-title hover-line hover-line predstava-index-title">
                    <a href={`/predstave/${data.predstava_slug}`}>
                        {data.naziv_predstave}
                    </a>
                </h3>
                <div className="post-metas">
                    <ul className="list-inline">
                        {showPozoriste
                            ? data.pozorista.map((poz) => (
                                  <li key={poz.pozoristeid}>
                                      {poz.naziv_pozorista}
                                  </li>
                              ))
                            : data.premijera && (
                                  <li>
                                      {" "}
                                      <i className="fa-light fa-calendar-day"></i>
                                      Premijera:{" "}
                                      {moment(data.premijera).format(
                                          "DD.MMM.YYYY.",
                                      )}
                                  </li>
                              )}
                    </ul>
                </div>
            </div>
            <div className="predstava-index-ocena-recenzija-wrapper">
                <div className="predstava-index-ocena-komentari">
                    {data.prosecna_ocena && (
                        <div className="rating-wrapper">
                            <FontAwesomeIcon icon={faStar} />{" "}
                            <span className="current-rating">
                                {" "}
                                {data.prosecna_ocena}
                            </span>
                        </div>
                    )}
                    {data.broj_komentara > 0 && (
                        <div className="predstava-index-komentari">
                            <FontAwesomeIcon icon={faComments} />{" "}
                            <span className="komentari-count">
                                {data.broj_komentara}
                            </span>
                        </div>
                    )}
                </div>
                {data.review_slug && (
                    <div className="predstava-index-recenzija">
                        <Link
                            href={`/predstave/${data.predstava_slug}#tekstovi`}
                        >
                            Pročitaj recenziju
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PredstaveLayout;
