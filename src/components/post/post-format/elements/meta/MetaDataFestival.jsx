import Image from "next/image";
import moment from "moment";
import HeadMeta from "../../../../elements/HeadMeta";
import Breadcrumb from "../../../../common/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const MetaDataFestival = ({ metaData }) => {
    const formatDateRange = (date1, date2) => {
        const d1 = moment(date1);
        const d2 = moment(date2);
        if (d1.isSame(d2, "month") && d1.isSame(d2, "year")) {
            return `${d1.format("DD")} - ${d2.format("DD")}. ${d1.format(
                "MMMM YYYY",
            )}`;
        } else {
            return `${d1.format("DD. MM")} - ${d2.format("DD. MM. YYYY")}`;
        }
    };

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return (
        <>
            <HeadMeta metaTitle={metaData.naziv_festivala} />
            {isTabletOrMobile ? (
                <div className="banner banner__default bg-grey-light-three">
                    <div className="container">
                        <div className="festival-single-plakat">
                            <Image
                                src={metaData.festival_slika}
                                alt={metaData.naziv_festivala}
                                width={160}
                                height={200}
                            />
                        </div>

                        <div className="post-title-wrapper festival-single-title">
                            <h1 className="m-b-xs-30 m-t-xs-30 axil-title hover-line">
                                {metaData.naziv_festivala}
                            </h1>
                            <div className="post-metas banner-post-metas m-t-xs-20">
                                <ul className="list-inline">
                                    <li>
                                        <FontAwesomeIcon icon={faMapPin} />
                                        {metaData.grad?.naziv_grada}
                                    </li>
                                    <li>
                                        <FontAwesomeIcon
                                            icon={faCalendarDays}
                                        />
                                        {formatDateRange(
                                            metaData.datumod,
                                            metaData.datumdo,
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <Breadcrumb
                        bCat="Festivali"
                        aPage={metaData.naziv_festivala}
                    />
                    <div className="banner banner__default bg-grey-light-three">
                        <div className="container">
                            <div className="row festival-single-wrap">
                                <div className="col-12 col-md-auto">
                                    <div
                                        className="festival-single-plakat"
                                        style={{ position: "relative" }}
                                    >
                                        <Image
                                            src={metaData.festival_slika}
                                            alt={metaData.naziv_festivala}
                                            width={180}
                                            height={200}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-auto">
                                    <div className="post-title-wrapper festival-info-wrapper">
                                        <h2 className="m-b-xs-0 m-t-xs-0 axil-title hover-line">
                                            {metaData.naziv_festivala}
                                        </h2>
                                        <div className="post-metas banner-post-metas m-t-xs-20">
                                            <ul className="list-unstyled">
                                                <li>
                                                    <FontAwesomeIcon
                                                        icon={faMapPin}
                                                    />
                                                    {metaData.grad?.naziv_grada}
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon
                                                        icon={faCalendarDays}
                                                    />
                                                    {formatDateRange(
                                                        metaData.datumod,
                                                        metaData.datumdo,
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default MetaDataFestival;
