import Image from "next/legacy/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faComments,
    faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Dropdown, Spinner } from "react-bootstrap";
import { useState } from "react";

const PredstavaOdgledana = ({ data, handleRate, pClass, videoIcon }) => {
    const [loading, setLoading] = useState(false);

    const handleRateClick = async (value) => {
        setLoading(true);
        await handleRate(data.predstavaid, value);
        setLoading(false);
    };

    return (
        <div
            className={`media post-block post-block__small bg-grey-light-three predstava-index-wrapper odgledana-predstava-wrapper ${
                pClass ?? "post-block__on-dark-bg m-b-xs-30"
            }`}
        >
            <Link
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
            </Link>

            <div className="media-body predstava-index-info">
                <div className="post-cat-group">
                    {data.zanrovi?.map((zanr) => (
                        <Link
                            href={`/category/${zanr.naziv_zanra}`}
                            className="post-cat zanr-button"
                            style={{
                                color: zanr.zanr_boja,
                                borderColor: zanr.zanr_boja,
                            }}
                            key={zanr.zanrid}
                        >
                            {zanr.naziv_zanra}
                        </Link>
                    ))}
                </div>
                <h3 className="axil-post-title hover-line hover-line predstava-index-title">
                    <Link href={`/predstave/${data.predstava_slug}`}>
                        {data.naziv_predstave}
                    </Link>
                </h3>
                <div className="post-metas">
                    <ul className="list-inline">
                        {data.pozorista?.map((poz) => (
                            <li key={poz.pozoristeid}>{poz.naziv_pozorista}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="predstava-index-ocena-recenzija-wrapper">
                <div className="predstava-index-ocena-komentari">
                    <div className="rating-wrapper">
                        {loading ? (
                            <Spinner animation="border" size="sm" />
                        ) : data.ocena_korisnika ? (
                            <>
                                <FontAwesomeIcon icon={faStar} />{" "}
                                <span className="current-rating">
                                    {" "}
                                    {data.ocena_korisnika.ocena}
                                </span>
                            </>
                        ) : (
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="rating-link"
                                >
                                    <FontAwesomeIcon icon={faStarHalfStroke} />
                                    Oceni
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <Dropdown.Item
                                            key={i + 1}
                                            onClick={() =>
                                                handleRateClick(i + 1)
                                            }
                                        >
                                            {i + 1} ★
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>
                    {data.komentar_korisnika ? (
                        <div className="predstava-index-komentari">
                            <FontAwesomeIcon icon={faComments} />{" "}
                            <span className="komentari-count">
                                {data.komentar_korisnika}
                            </span>
                        </div>
                    ) : (
                        <Link
                            href={`/predstave/${data.predstava_slug}#komentari`}
                            className="card-link"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            Ostavi komentar
                        </Link>
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

export default PredstavaOdgledana;
