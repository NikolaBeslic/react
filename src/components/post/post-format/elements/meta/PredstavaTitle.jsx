import Image from "react-bootstrap/Image";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import Rating from "react-rating";
import axiosClient from "../../../../../utils/axios";
import { Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import HeadMeta from "../../../../elements/HeadMeta";
import Breadcrumb from "../../../../common/Breadcrumb";
import { csrf, getCookieValue } from "../../../../../utils";
import PredstavaStickyTitle from "./PredstavaStickyTitle";
import { useUser } from "../../../../../contexts/UserContext";

const PredstavaTitle = ({ metaData, ratingLoading, handleRating }) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
    const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
    const { user, setModalOpen } = useUser();
    const [naListiZelja, setNaListiZelja] = useState(
        metaData.naListiZeljaKorisnika,
    );
    const [naListiOdgledanih, setNaListiOdgledanih] = useState(
        metaData.naListiOdgledanihKorisnika,
    );

    const ratingProps = {
        stop: 10,
        emptySymbol: "fa-regular fa-star",
        fullSymbol: "fa fa-star",
    };

    if (metaData.ocenaKorisnika) {
        ratingProps.readonly = true;
        ratingProps.initialRating = metaData.ocenaKorisnika;
    }
    const [naListiZeljaLoading, setNaListiZeljaLoading] = useState(false);
    const handleDodajNaListuZelja = async () => {
        if (!user) {
            alert("You must be logged in to rate a post.");
            return;
        }
        setNaListiZeljaLoading(true);
        await csrf();
        axiosClient
            .post(
                "/predstava/dodajNaListuZelja",
                {
                    user: user,
                    predstavaid: metaData.predstavaid,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((res) => {
                console.log(res);
                setNaListiZelja(true);
                handleUpdateDodajNaListuZelja();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setNaListiZeljaLoading(false));
    };

    const [odgledaneLoading, setOdgledaneLoading] = useState(false);
    const handleDodajUOdgledane = async () => {
        if (!user) {
            alert("You must be logged in to do this");
            return;
        }
        setOdgledaneLoading(true);
        await csrf();
        axiosClient
            .post(
                "/predstava/dodajUOdgledane",
                {
                    user: user,
                    predstavaid: metaData.predstavaid,
                },
                {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": getCookieValue("XSRF-TOKEN"),
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((res) => {
                console.log(res);
                setNaListiOdgledanih(true);

                handleUpdateListaOdgledanih();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setOdgledaneLoading(false));
    };

    return (
        <>
            <HeadMeta metaTitle={metaData.naziv_predstave} />
            <Breadcrumb bCat="Predstave" aPage={metaData.naziv_predstave} />
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
                                    <h1 className="m-b-xs-5 m-t-xs-10 predstava-single-title hover-line">
                                        {metaData.naziv_predstave}
                                    </h1>
                                    <ul className="list-inline">
                                        <li>
                                            <p>
                                                <i className="fa-solid fa-masks-theater"></i>
                                                {metaData.pozorista?.map(
                                                    (pozoriste) => (
                                                        <span
                                                            className="author-name text-muted"
                                                            key={
                                                                pozoriste.pozoristeid
                                                            }
                                                        >
                                                            <a
                                                                href={`/pozorista/${pozoriste.pozoriste_slug}`}
                                                            >
                                                                {
                                                                    pozoriste.naziv_pozorista
                                                                }
                                                            </a>
                                                        </span>
                                                    ),
                                                )}
                                            </p>
                                        </li>
                                    </ul>
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
                                        <div className="post-metas banner-post-metas m-t-xs-20">
                                            <ul className="list-inline">
                                                <li>
                                                    <i className="fa-solid fa-pen-fancy"></i>
                                                    Autor: {metaData.autor}
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-signs-post"></i>
                                                    Režija: {metaData.reditelj}
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li>
                                                    <i className="feather icon-share-2" />
                                                    Premijera:{" "}
                                                    {moment(
                                                        metaData.premijera,
                                                    ).format("dd.MMM.YYYY")}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* TO DO Font awesome as React comp, and rating as component */}
                                    <div className="rating-wrapper">
                                        <i className="fa-xl fa-solid fa-star"></i>
                                        <span className="current-rating">
                                            {metaData.prosecnaOcena}
                                        </span>
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
                                                            <i className="fa-solid fa-masks-theater"></i>
                                                            {metaData.pozorista?.map(
                                                                (pozoriste) => (
                                                                    <span
                                                                        className="author-name text-muted"
                                                                        key={
                                                                            pozoriste.pozoristeid
                                                                        }
                                                                    >
                                                                        <a
                                                                            href={`/pozorista/${pozoriste.pozoriste_slug}`}
                                                                        >
                                                                            {" "}
                                                                            {
                                                                                pozoriste.naziv_pozorista
                                                                            }
                                                                        </a>{" "}
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
                                                    variant="outline-primary"
                                                    className="btn btn-secondary btn-small"
                                                    disabled
                                                >
                                                    <i className="fa-solid fa-check"></i>
                                                    Na listi zelja
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline-primary"
                                                    className="btn btn-secondary btn-small"
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
                                                        <i className="fa-solid fa-circle-plus"></i>
                                                    )}
                                                    Dodaj na listu zelja
                                                </Button>
                                            )}

                                            <br />
                                            {metaData.naListiOdgledanihKorisnika ? (
                                                <Button
                                                    variant="outline-primary"
                                                    className="btn btn-secondary btn-small"
                                                    disabled
                                                >
                                                    <i className="fa-solid fa-check"></i>
                                                    Na listi odgledanih
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="outline"
                                                        className="btn btn-primary btn-small"
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
                                                            <i className="fa-solid fa-circle-plus"></i>
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
