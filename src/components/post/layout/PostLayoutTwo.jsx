import Image from "next/legacy/image";
import Link from "next/link";
import moment from "moment";

const PostLayoutTwo = ({ data, postSizeMd, postBgDark }) => {
    return (
        <div
            className={`category-index-post-block media post-block m-b-xs-60 bg-grey-light-three ${
                postSizeMd === true ? "post-block__mid" : ""
            } ${postBgDark === true ? "post-block__on-dark-bg" : ""}`}
        >
            <Link
                href={`/${data.kategorija?.kategorija_slug}/${data.slug}`}
                title={data.naslov}
            >
                <Image
                    src={data?.tekst_photo}
                    alt={data.naslov}
                    width={postSizeMd === true ? 250 : 150}
                    height={postSizeMd === true ? 250 : 150}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                />
            </Link>
            <div className="media-body">
                <div className="post-cat-group m-b-xs-10">
                    <a
                        href={`/${data.kategorija?.kategorija_slug}`}
                        className={`post-cat cat-btn ${data.kategorija?.naziv_kategorije}-tag-bg-color`}
                        style={{
                            backgroundColor: data.kategorija.kategorija_boja,
                        }}
                    >
                        {data.kategorija?.naziv_kategorije}
                    </a>
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
                            <span>
                                <i className="fa-regular fa-clock"></i>
                            </span>

                            {moment(data.published_at).fromNow()}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PostLayoutTwo;
