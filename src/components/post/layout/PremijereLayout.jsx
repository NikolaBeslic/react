import Image from "next/legacy/image";
import moment from "moment";
import Link from "next/link";

const PremijereLayout = ({ data, pClass, videoIcon }) => {
    return (
        <div
            className={`media post-block post-block__small predstava-index-wrapper premijera-index-wrapper bg-grey-light-three ${
                pClass ?? "post-block__on-dark-bg m-b-xs-30"
            }`}
        >
            <div className="premijera-index-image-wrapper">
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
                            className="premijere-index-image"
                        />
                        {videoIcon === true ? (
                            <span className="video-play-btn video-play-btn__small" />
                        ) : (
                            ""
                        )}
                    </>
                </Link>
            </div>

            <div className="media-body predstava-index-info">
                {/* {data.zanrovi?.map(zanr => (
                        <a
                            href={`/category/${zanr.naziv_zanra}`}
                            className="post-cat zanr-button"
                            style={{ color: zanr.zanr_boja, borderColor: zanr.zanr_boja }}
                            legacyBehavior>
                            {zanr.naziv_zanra}
                        </a>
                    ))} */}

                <h4 className="axil-post-title hover-line hover-line">
                    <Link href={`/predstave/${data.predstava_slug}`}>
                        {data.naziv_predstave}
                    </Link>
                </h4>
                <div className="post-metas">
                    <div className="post-cat-group premijere-naziv-pozorista">
                        {data.pozorista.length > 0 && (
                            <>
                                <span
                                    key={data.pozorista[0].pozoristeid}
                                    className="text-muted"
                                >
                                    {data.pozorista[0].naziv_pozorista}
                                </span>
                                {data.pozorista.length > 1 && (
                                    <span className="text-muted more-pozorista">
                                        {" "}
                                        + {data.pozorista.length - 1}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                    <ul className="list-inline">
                        {data.premijera && (
                            <li className="text-muted">
                                <i className="fa-light fa-calendar-day"></i>
                                Premijera:{" "}
                                {moment(data.premijera).format("DD. MMM YYYY.")}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PremijereLayout;
