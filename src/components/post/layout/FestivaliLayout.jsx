import Image from "next/legacy/image";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const FestivaliLayout = ({ data, pClass, videoIcon }) => {
    const formatDateRange = (date1, date2) => {
        const d1 = moment(date1);
        const d2 = moment(date2);
        if (d1.isSame(d2, "month") && d1.isSame(d2, "year")) {
            return `${d1.format("DD")} - ${d2.format("DD")}. ${d1.format("MMMM YYYY")}`;
        } else {
            return `${d1.format("DD. MM")} - ${d2.format("DD. MM. YYYY")}`;
        }
    };

    return (
        <div
            className={`media post-block post-block__small bg-grey-light-three festival-index-wrapper ${pClass ?? "post-block__on-dark-bg m-b-xs-30"}`}
        >
            <Link
                href={`/festivali/${data.festival_slug}`}
                className="align-self-center"
            >
                {data.festival_slika && (
                    <>
                        <Image
                            src={data.festival_slika}
                            alt={data.festival_slug}
                            width={100}
                            height={150}
                            objectFit="cover"
                        />
                        {videoIcon === true ? (
                            <span className="video-play-btn video-play-btn__small" />
                        ) : (
                            ""
                        )}
                    </>
                )}
            </Link>

            <div className="media-body festival-index-info">
                <h3 className="axil-post-title hover-line hover-line predstava-index-title">
                    <Link href={`/festivali/${data.festival_slug}`}>
                        {data.naziv_festivala}
                    </Link>
                </h3>
                <div className="post-metas">
                    <ul className="list-unstyled">
                        <li>
                            <FontAwesomeIcon icon={faMapPin} />
                            {data.grad.naziv_grada}
                        </li>
                        <br />
                        <li>
                            <i className="fa-light fa-calendar-range"></i>
                            {formatDateRange(data.datumod, data.datumdo)}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FestivaliLayout;
