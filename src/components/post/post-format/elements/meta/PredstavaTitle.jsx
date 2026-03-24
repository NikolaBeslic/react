import Image from "react-bootstrap/Image";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import Rating from "react-rating";
import { Button, Spinner } from "react-bootstrap";
import HeadMeta from "../../../../elements/HeadMeta";
import PredstavaStickyTitle from "./PredstavaStickyTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileCirclePlus,
    faCheckDouble,
    faFileImport,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const PredstavaTitle = ({
    metaData,
    ratingLoading,
    handleRating,
    naListiZeljaLoading,
    handleDodajNaListuZelja,
    odgledaneLoading,
    handleDodajUOdgledane,
}) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
    const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

    const ratingProps = {
        stop: 10,
        emptySymbol: "fa-regular fa-star",
        fullSymbol: "fa fa-star",
    };

    if (metaData.ocenaKorisnika) {
        ratingProps.readonly = true;
        ratingProps.initialRating = metaData.ocenaKorisnika;
    }

    return (
        <>
            <HeadMeta
                metaTitle={metaData.seo_title}
                metaDescription={metaData.seo_description}
                metaUrl={metaData.seo_url}
                metaImage={metaData.seo_image}
            />
            <PredstavaStickyTitle
                posterUrl={metaData.plakat}
                title={metaData.naziv_predstave}
                avgRating={metaData.prosecnaOcena}
                ratingCount={metaData.brojOcena}
            />
            <div
                className="banner banner__default bg-grey-light-three"
                id="predstava-hero"
            >
                <div className="container">
                    <div className="row g-4 align-items-start">
                        {isTabletOrMobile ? (
                            <>
                                <div className="col-sm-12 col-xs-12">
                                    <div className="btn-group">
                                        {metaData.zanrovi?.map((zanr) => (
                                            <div
                                                className="zanr-button"
                                                key={zanr.zanrid}
                                                style={{
                                                    color: zanr.zanr_boja,
                                                    borderColor: zanr.zanr_boja,
                                                }}
                                            >
                                                {zanr.naziv_zanra}
                                            </div>
                                        ))}
                                    </div>
                                    <h1 className="m-b-xs-15 m-t-xs-15 predstava-single-title hover-line">
                                        {metaData.naziv_predstave}
                                    </h1>
                                    <div className="col-sm-12 col-xs-12">
                                        <div
                                            className="predstava-single-plakat"
                                            style={{ position: "relative" }}
                                        >
                                            <Image
                                                src={
                                                    metaData.plakat ||
                                                    "/slike/vizitke-cover.jpg"
                                                }
                                                alt={metaData.predstava_slug}
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-xs-12">
                                        <div className="post-metas banner-post-metas m-t-xs-20 predstava-single-metas">
                                            <ul className="predstava-meta-info-list">
                                                <li>
                                                    <i className="fa-regular fa-building-columns"></i>
                                                    {metaData.pozorista?.map(
                                                        (pozoriste, index) => (
                                                            <span
                                                                className="author-name text-muted"
                                                                key={
                                                                    pozoriste.pozoristeid
                                                                }
                                                            >
                                                                <Link
                                                                    href={`/pozorista/${pozoriste.pozoriste_slug}`}
                                                                >
                                                                    {
                                                                        pozoriste.naziv_pozorista
                                                                    }
                                                                </Link>
                                                                {index <
                                                                    metaData
                                                                        .pozorista
                                                                        .length -
                                                                        1 &&
                                                                    " · "}
                                                            </span>
                                                        ),
                                                    )}
                                                </li>
                                                <li>
                                                    <i className="fa-light fa-calendar-day"></i>
                                                    Premijera:{" "}
                                                    {moment(
                                                        metaData.premijera,
                                                    ).format("DD. MMM YYYY.")}
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-signs-post"></i>
                                                    Režija: {metaData.reditelj}
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-pen-fancy"></i>
                                                    Autor: {metaData.autor}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* TO DO Font awesome as React comp, and rating as component */}
                                    <div className="rating-wrapper">
                                        <div className="average-rating">
                                            <p className="average-rating-text">
                                                Prosečna ocena
                                            </p>
                                            <p className="average-rating-current-rate">
                                                <i className="fa-xl fa-solid fa-star"></i>{" "}
                                                <span className="current-rating">
                                                    {metaData.prosecnaOcena} /
                                                    10
                                                </span>{" "}
                                                <span className="number-of-ratings">
                                                    ({metaData.brojOcena})
                                                </span>
                                            </p>
                                        </div>
                                        <div className="user-rating">
                                            {ratingLoading ? (
                                                <Spinner
                                                    animation="border"
                                                    role="status"
                                                    className="hup-spinner"
                                                    size="sm"
                                                />
                                            ) : (
                                                <>
                                                    <p className="average-rating-text">
                                                        Tvoja ocena
                                                    </p>

                                                    <Rating
                                                        style={{
                                                            fontSize: "16px",
                                                        }}
                                                        {...ratingProps}
                                                        onChange={(value) =>
                                                            handleRating(value)
                                                        }
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="predstava-actions ms-lg-auto">
                                        {metaData.naListiZeljaKorisnika ? (
                                            <Button
                                                variant="primary"
                                                className="btn btn-primary btn-small"
                                                disabled
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                />
                                                Na listi zelja
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                className="btn btn-primary btn-small"
                                                onClick={
                                                    handleDodajNaListuZelja
                                                }
                                            >
                                                {naListiZeljaLoading ? (
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        role="status"
                                                        size="sm"
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faFileCirclePlus}
                                                    />
                                                )}
                                                Dodaj na listu zelja
                                            </Button>
                                        )}

                                        <br />
                                        {metaData.naListiOdgledanihKorisnika ? (
                                            <Button
                                                className="btn btn-primary btn-small btn-nofill"
                                                disabled
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCheckDouble}
                                                />
                                                Na listi odgledanih
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    className="btn btn-primary btn-small btn-nofill"
                                                    onClick={
                                                        handleDodajUOdgledane
                                                    }
                                                >
                                                    {odgledaneLoading ? (
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            role="status"
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={faFileImport}
                                                        />
                                                    )}
                                                    Dodaj u odgledane
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-12 col-md-auto">
                                    <div
                                        className="predstava-single-plakat"
                                        style={{ position: "relative" }}
                                    >
                                        <Image
                                            src={
                                                metaData.plakat ||
                                                "/slike/vizitke-cover.jpg"
                                            }
                                            alt={metaData.predstava_slug}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* INFO + ACTIONS WRAPPER */}
                                <div className="col-12 col-md">
                                    <div className="d-flex flex-column flex-lg-row gap-3">
                                        {/* INFO (title + meta + rating) */}
                                        <div className="flex-grow-1">
                                            <div className="post-title-wrapper predstava-title-wrapper">
                                                {metaData.zanrovi.length >
                                                    0 && (
                                                    <div className="btn-group">
                                                        {metaData.zanrovi?.map(
                                                            (zanr) => (
                                                                <div
                                                                    className="zanr-button post-cat"
                                                                    key={
                                                                        zanr.zanrid
                                                                    }
                                                                    style={{
                                                                        color: zanr.zanr_boja,
                                                                        borderColor:
                                                                            zanr.zanr_boja,
                                                                    }}
                                                                >
                                                                    {
                                                                        zanr.naziv_zanra
                                                                    }
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                                <h1 className="m-b-xs-0 m-t-xs-0 axil-title hover-line">
                                                    {metaData.naziv_predstave}
                                                </h1>
                                                <div className="post-metas banner-post-metas m-t-xs-20">
                                                    <ul className="predstava-meta-info-list">
                                                        <li>
                                                            <i className="fa-regular fa-building-columns"></i>
                                                            {metaData.pozorista?.map(
                                                                (
                                                                    pozoriste,
                                                                    index,
                                                                ) => (
                                                                    <span
                                                                        className="author-name text-muted"
                                                                        key={
                                                                            pozoriste.pozoristeid
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={`/pozorista/${pozoriste.pozoriste_slug}`}
                                                                        >
                                                                            {
                                                                                pozoriste.naziv_pozorista
                                                                            }
                                                                        </Link>
                                                                        {index <
                                                                            metaData
                                                                                .pozorista
                                                                                .length -
                                                                                1 &&
                                                                            " · "}
                                                                    </span>
                                                                ),
                                                            )}
                                                        </li>
                                                        <li>
                                                            <i className="feather icon-share-2" />
                                                            Premijera:{" "}
                                                            {moment(
                                                                metaData.premijera,
                                                            ).format(
                                                                "DD. MMMM YYYY.",
                                                            )}
                                                        </li>

                                                        <li>
                                                            <i className="fa-solid fa-pen-fancy"></i>
                                                            Autor:{" "}
                                                            {metaData.autor}
                                                        </li>
                                                        <li>
                                                            <i className="fa-solid fa-signs-post"></i>
                                                            Režija:{" "}
                                                            {metaData.reditelj}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* TO DO Font awesome as React comp, and rating as component */}

                                            <div className="rating-wrapper">
                                                <div className="average-rating">
                                                    <p className="average-rating-text">
                                                        Prosečna ocena
                                                    </p>
                                                    <p className="average-rating-current-rate">
                                                        <i className="fa-xl fa-solid fa-star"></i>{" "}
                                                        <span className="current-rating">
                                                            {
                                                                metaData.prosecnaOcena
                                                            }{" "}
                                                            / 10
                                                        </span>{" "}
                                                        <span className="number-of-ratings">
                                                            (
                                                            {metaData.brojOcena}
                                                            )
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="user-rating">
                                                    {ratingLoading ? (
                                                        <Spinner
                                                            animation="border"
                                                            role="status"
                                                            className="hup-spinner"
                                                            size="sm"
                                                        />
                                                    ) : (
                                                        <>
                                                            <p className="average-rating-text">
                                                                Tvoja ocena
                                                            </p>

                                                            <Rating
                                                                style={{
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                                {...ratingProps}
                                                                onChange={(
                                                                    value,
                                                                ) =>
                                                                    handleRating(
                                                                        value,
                                                                    )
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="predstava-actions ms-lg-auto">
                                            {metaData.naListiZeljaKorisnika ? (
                                                <Button
                                                    variant="primary"
                                                    className="btn btn-primary btn-small"
                                                    disabled
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                    Na listi zelja
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="primary"
                                                    className="btn btn-primary btn-small"
                                                    onClick={
                                                        handleDodajNaListuZelja
                                                    }
                                                >
                                                    {naListiZeljaLoading ? (
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            role="status"
                                                            size="sm"
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faFileCirclePlus
                                                            }
                                                        />
                                                    )}
                                                    Dodaj na listu zelja
                                                </Button>
                                            )}

                                            <br />
                                            {metaData.naListiOdgledanihKorisnika ? (
                                                <Button
                                                    className="btn btn-primary btn-small btn-nofill"
                                                    disabled
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCheckDouble}
                                                    />
                                                    Na listi odgledanih
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button
                                                        className="btn btn-primary btn-small btn-nofill"
                                                        onClick={
                                                            handleDodajUOdgledane
                                                        }
                                                    >
                                                        {odgledaneLoading ? (
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                role="status"
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faFileImport
                                                                }
                                                            />
                                                        )}
                                                        Dodaj u odgledane
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PredstavaTitle;
