import Image from "next/legacy/image";
import moment from "moment";
import HeadMeta from "../../../../elements/HeadMeta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { formatDuration } from "../../../../../utils/";
import { useMediaQuery } from "react-responsive";

const MetaDataHupkast = ({ metaData }) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    return (
        <>
            <HeadMeta
                metaTitle={metaData.seo_title}
                metaDescription={metaData.seo_description}
                metaUrl={metaData.seo_url}
                metaImage={metaData.seo_image}
            />
            {isTabletOrMobile ? (
                <div className="banner banner__single-post banner__standard bg-grey-light-three">
                    <div className="perfect-square col-md-auto hupkast-single-photo">
                        <Image
                            src={metaData.tekst_photo}
                            alt={metaData.naslov}
                            width={250}
                            height={250}
                        />
                    </div>
                    <div className="container">
                        <div className="hupkast-single-title-info-wrapper col-md">
                            <div className="post-title-wrapper">
                                <div className="btn-group">
                                    {/* {metaData.grad?.naziv_grada} */}
                                </div>
                                <h1 className="m-b-xs-30 m-t-xs-10 axil-title hover-line">
                                    {metaData.naslov}
                                </h1>
                                <div className="post-metas banner-post-metas m-t-xs-20">
                                    <ul className="list-inline">
                                        <li>
                                            <FontAwesomeIcon
                                                icon={faCalendarDays}
                                            />
                                            {moment(
                                                metaData.published_at,
                                            ).format("DD. MMM yyyy.")}
                                        </li>
                                        {metaData.hupkast?.trajanje && (
                                            <li>
                                                <FontAwesomeIcon
                                                    icon={faHourglassStart}
                                                />
                                                {formatDuration(
                                                    metaData.hupkast.trajanje,
                                                )}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="banner banner__single-post banner__standard">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="hupkast-single-title-info-wrapper col-md">
                                        <div className="post-title-wrapper">
                                            <div className="btn-group">
                                                {/* {metaData.grad?.naziv_grada} */}
                                            </div>
                                            <h1 className="m-b-xs-30 m-t-xs-10 axil-title hover-line">
                                                {metaData.naslov}
                                            </h1>
                                            <div className="post-metas banner-post-metas m-t-xs-20">
                                                <ul className="list-inline">
                                                    <li>
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faCalendarDays
                                                            }
                                                        />
                                                        {moment(
                                                            metaData.published_at,
                                                        ).format(
                                                            "DD. MMM yyyy.",
                                                        )}
                                                    </li>
                                                    {metaData.hupkast
                                                        ?.trajanje && (
                                                        <li>
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faHourglassStart
                                                                }
                                                            />
                                                            {formatDuration(
                                                                metaData.hupkast
                                                                    .trajanje,
                                                            )}
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="post-main-thumbnail">
                                        <Image
                                            src={metaData.tekst_photo}
                                            alt={metaData.naslov}
                                            width={540}
                                            height={540}
                                            className="img-fluid"
                                        />
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

export default MetaDataHupkast;
