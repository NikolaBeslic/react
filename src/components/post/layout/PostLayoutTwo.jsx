import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const PostLayoutTwo = ({ data, postSizeMd, postBgDark }) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    return (
        <div
            className={`category-index-post-block media post-block m-b-xs-40 m-b-md-50 bg-grey-light-three ${
                postSizeMd === true ? "post-block__mid" : ""
            } ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}
        >
            <div className="category-index-post-image-wrapper">
                <Link
                    href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                    title={data.naslov}
                >
                    <Image
                        src={data?.tekst_photo}
                        alt={data.naslov}
                        width={isTabletOrMobile ? 100 : 150}
                        height={isTabletOrMobile ? 100 : 150}
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                    />
                </Link>
            </div>
            <div className="media-body">
                <div className="post-cat-group m-b-xs-10">
                    <Link
                        href={`/${data.kategorija?.kategorija_slug}`}
                        className={`post-cat cat-btn ${data.kategorija?.naziv_kategorije}-tag-bg-color`}
                        style={{
                            backgroundColor: data.kategorija.kategorija_boja,
                        }}
                    >
                        {data.kategorija?.naziv_kategorije}
                    </Link>
                </div>
                <h3 className="axil-post-title hover-line hover-line">
                    <Link
                        href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                        title={data.naslov}
                    >
                        {data.naslov}
                    </Link>
                </h3>
                {postSizeMd === true ? (
                    <div
                        className="mid"
                        dangerouslySetInnerHTML={{
                            __html: data.uvod
                                ? data.uvod
                                : data.sadrzaj?.slice(0, 250) + "...",
                        }}
                    ></div>
                ) : (
                    ""
                )}
                <div className="post-metas">
                    <ul className="list-inline">
                        <li>
                            <FontAwesomeIcon icon={faClock} />
                            {moment(data.published_at).fromNow()}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PostLayoutTwo;
