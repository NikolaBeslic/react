import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";

const RezultatiPretrage = ({ data, postSizeMd, postBgDark }) => {
    return (
        <div
            className={`media post-block m-b-xs-30 ${
                postSizeMd === true ? "post-block__mid" : ""
            } ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}
        >
            <Link
                href={`/${data.kategorija_slug}/${data.slug}`}
                title={data.naslov}
            >
                <Image
                    src={data.photo ?? "/images/placeholder.png"}
                    alt={data.naslov ?? ""}
                    width={postSizeMd === true ? 285 : 150}
                    height={postSizeMd === true ? 285 : 150}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                />
            </Link>
            <div className="media-body">
                <div className="post-cat-group m-b-xs-10">
                    <a
                        href={`/${data.kategorija_slug}`}
                        className={`post-cat cat-btn ${data.kategorija}-tag-bg-color`}
                        style={{
                            backgroundColor: data.boja,
                        }}
                    >
                        {data.kategorija}
                    </a>
                </div>
                <h3 className="axil-post-title hover-line hover-line">
                    <Link
                        href={`/${data.kategorija_slug}/${data.slug}`}
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
                            <i className="fa-regular fa-clock"></i>
                            {moment(data.datum).fromNow()}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RezultatiPretrage;
