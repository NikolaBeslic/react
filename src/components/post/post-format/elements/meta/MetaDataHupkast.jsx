import Image from "next/legacy/image";
import Link from "next/link";
import { slugify } from "../../../../../utils";
import moment from "moment";
import Breadcrumb from "../../../../common/Breadcrumb";

const MetaDataHupkast = ({ metaData }) => {
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

    return (
        <>
            <Breadcrumb bCat="HuPkast" aPage={metaData.naslov} />

            <div className="banner banner__default bg-grey-light-three">
                <div className="container">
                    <div className="row">
                        <div className="perfect-square col-md-auto">
                            <Image
                                src={metaData.tekst_photo}
                                alt={metaData.naslov}
                                width={250}
                                height={250}
                            />
                        </div>

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
                                            <i className="feather icon-calendar" />
                                            {moment(metaData.created_at).format(
                                                "DD.MMM.YYYY.",
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
    );
};

export default MetaDataHupkast;
