import Image from "react-bootstrap/Image";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import Rating from "react-rating";
import { useStateContext } from "../../../../../contexts/StateContext";
import axiosClient from "../../../../../utils/axios";

const PredstavaTitle = ({ metaData, handleUpdatePostRating }) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
    const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

    const { currentUser } = useStateContext();
    const handleRating = async (value) => {
        if (!currentUser) {
            alert("You must be logged in to rate a post.");
            return;
        }

        axiosClient
            .post(
                "/predstava/oceni",
                {
                    ocena: value,
                    user: currentUser,
                    predstavaid: metaData.predstavaid,
                },

                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                handleUpdatePostRating(res.data.data);
            });
    };

    return (
        <div className="banner banner__default bg-grey-light-three">
            <div className="container">
                <div className="row">
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
                                                            {" "}
                                                            {
                                                                pozoriste.naziv_pozorista
                                                            }
                                                        </a>{" "}
                                                    </span>
                                                )
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
                                            src={metaData.plakat}
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
                                                    metaData.premijera
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
                            <div className="col-lg-2">
                                <div
                                    className="predstava-single-plakat"
                                    style={{ position: "relative" }}
                                >
                                    <Image
                                        src={metaData.plakat}
                                        alt={metaData.predstava_slug}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="post-title-wrapper">
                                    <div className="btn-group">
                                        {metaData.zanrovi?.map((zanr) => (
                                            <div
                                                className="zanr-button post-cat"
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
                                    <h1 className="m-b-xs-0 m-t-xs-10 axil-title hover-line">
                                        {metaData.naziv_predstave}
                                    </h1>
                                    <div className="post-metas banner-post-metas m-t-xs-20">
                                        <ul className="list-inline">
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
                                                    )
                                                )}
                                            </li>
                                            <li>
                                                <i className="feather icon-share-2" />
                                                Premijera:{" "}
                                                {moment(
                                                    metaData.premijera
                                                ).format("DD. MMMM YYYY.")}
                                            </li>
                                        </ul>
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
                                    </div>
                                </div>
                                {/* TO DO Font awesome as React comp, and rating as component */}
                                <div className="rating-wrapper">
                                    <i className="fa-xl fa-solid fa-star"></i>
                                    <span className="current-rating">
                                        {metaData.prosecnaOcena}
                                    </span>
                                </div>
                                <p>
                                    <Rating
                                        stop={10}
                                        emptySymbol="fa-regular fa-star"
                                        fullSymbol="fa fa-star"
                                        onChange={handleRating}
                                    />
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PredstavaTitle;
