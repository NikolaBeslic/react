import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { formatDuration } from "../../utils";
import { useMediaQuery } from "react-responsive";

const HuPkastIndexLayout = ({ hupkastData }) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return (
        <div
            className="hupkast-index-wrapper post-block__mid bg-grey-light-three"
            key={hupkastData.tekstid}
        >
            <div className="hupkast-index-photo">
                <Link href={`hupkast/${hupkastData.slug}`}>
                    <Image
                        src={hupkastData.tekst_photo}
                        alt="hupkast"
                        width={200}
                        height={200}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                        objectFit="cover"
                    />
                    <span className="video-play-btn video-play-big" />
                </Link>
            </div>
            <div className="hupkast-index-info">
                <div className="hupkast-index-title">
                    <h3 className="axil-post-title hover-line hover-line">
                        <Link href={`hupkast/${hupkastData.slug}`}>
                            {hupkastData.naslov}
                        </Link>
                    </h3>
                </div>
                <div
                    className="hupkast-index-desc"
                    dangerouslySetInnerHTML={{ __html: hupkastData.uvod }}
                ></div>
                <div className="hupkast-metas post-metas">
                    <ul className="list-inline">
                        <li>
                            <FontAwesomeIcon icon={faCalendarDays} />
                            {moment(hupkastData.published_at).format(
                                "DD. MMM yyyy.",
                            )}
                        </li>
                        {hupkastData.hupkast?.trajanje && (
                            <li>
                                <FontAwesomeIcon icon={faHourglassStart} />
                                {formatDuration(hupkastData.hupkast.trajanje)}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HuPkastIndexLayout;
